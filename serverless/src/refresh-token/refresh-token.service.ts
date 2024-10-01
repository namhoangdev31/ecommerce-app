import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, MoreThanOrEqual, ObjectId } from 'typeorm';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';

import { CustomHttpException } from 'src/exception/custom-http.exception';
import { AuthService } from 'src/auth/auth.service';
import { UserSerializer } from 'src/auth/serializer/user.serializer';
import { ExceptionTitleList } from 'src/common/constants/exception-title-list.constants';
import { StatusCodesList } from 'src/common/constants/status-codes-list.constants';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { NotFoundException } from 'src/exception/not-found.exception';
import { RefreshToken } from 'src/refresh-token/entities/refresh-token.entity';
import { RefreshTokenInterface } from 'src/refresh-token/interface/refresh-token.interface';
import { RefreshTokenRepository } from 'src/refresh-token/refresh-token.repository';
import { RefreshPaginateFilterDto } from 'src/refresh-token/dto/refresh-paginate-filter.dto';
import { PaginationInfoInterface } from 'src/paginate/pagination-info.interface';
import { RefreshTokenSerializer } from 'src/refresh-token/serializer/refresh-token.serializer';
import { Pagination } from 'src/paginate';
import { UserEntity } from '../auth/entity/user.entity';

const BASE_OPTIONS: SignOptions = {
  issuer: process.env.APP_URL,
  audience: process.env.APP_FRONTEND_URL,
};

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshTokenRepository)
    private readonly repository: RefreshTokenRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly jwt: JwtService,
  ) {}

  /**
   * Generate refresh token
   * @param user
   * @param refreshToken
   */
  public async generateRefreshToken(
    user: UserEntity,
    refreshToken: Partial<RefreshToken>,
  ): Promise<string> {
    const token = await this.repository.createRefreshToken(user, refreshToken);
    const opts: SignOptions = {
      ...BASE_OPTIONS,
      subject: String(user._id),
      jwtid: String(token.id),
    };

    return this.jwt.signAsync(
      { ...opts },
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      },
    );
  }

  /**
   * Resolve encoded refresh token
   * @param encoded
   */
  public async resolveRefreshToken(encoded: string): Promise<{
    user: UserSerializer;
    token: RefreshToken;
  }> {
    const payload = await this.decodeRefreshToken(encoded);
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload);
    if (!token) {
      throw new CustomHttpException(
        ExceptionTitleList.NotFound,
        HttpStatus.NOT_FOUND,
        StatusCodesList.NotFound,
      );
    }

    if (token.isRevoked) {
      throw new CustomHttpException(
        ExceptionTitleList.InvalidRefreshToken,
        HttpStatus.BAD_REQUEST,
        StatusCodesList.InvalidRefreshToken,
      );
    }

    const user = await this.getUserFromRefreshTokenPayload(payload);

    if (!user) {
      throw new CustomHttpException(
        ExceptionTitleList.InvalidRefreshToken,
        HttpStatus.BAD_REQUEST,
        StatusCodesList.InvalidRefreshToken,
      );
    }

    return {
      user,
      token,
    };
  }

  /**
   * Create access token from refresh token
   * @param refresh
   */
  public async createAccessTokenFromRefreshToken(refresh: string): Promise<{
    token: string;
    user: UserSerializer;
  }> {
    const { user } = await this.resolveRefreshToken(refresh);
    const token = await this.authService.generateAccessToken(user);
    return {
      user,
      token,
    };
  }

  /**
   * Decode refresh token
   * @param token
   */
  async decodeRefreshToken(token: string): Promise<RefreshTokenInterface> {
    try {
      return await this.jwt.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new CustomHttpException(
          ExceptionTitleList.RefreshTokenExpired,
          HttpStatus.BAD_REQUEST,
          StatusCodesList.RefreshTokenExpired,
        );
      } else {
        throw new CustomHttpException(
          ExceptionTitleList.InvalidRefreshToken,
          HttpStatus.BAD_REQUEST,
          StatusCodesList.InvalidRefreshToken,
        );
      }
    }
  }

  /**
   * get user detail from refresh token
   * @param payload
   */
  async getUserFromRefreshTokenPayload(
    payload: RefreshTokenInterface,
  ): Promise<UserSerializer> {
    const subId = payload.subject;

    if (!subId) {
      throw new CustomHttpException(
        ExceptionTitleList.InvalidRefreshToken,
        HttpStatus.BAD_REQUEST,
        StatusCodesList.InvalidRefreshToken,
      );
    }

    return this.authService.findById(subId);
  }

  /**
   * Get refresh token entity from token payload
   * @param payload
   */
  async getStoredTokenFromRefreshTokenPayload(
    payload: RefreshTokenInterface,
  ): Promise<RefreshToken | null> {
    const tokenId = payload.jwtid;

    if (!tokenId) {
      throw new CustomHttpException(
        ExceptionTitleList.InvalidRefreshToken,
        HttpStatus.BAD_REQUEST,
        StatusCodesList.InvalidRefreshToken,
      );
    }

    return this.repository.findTokenById(tokenId);
  }

  /**
   * Get active refresh token list of user
   * @param userId
   */
  async getRefreshTokenByUserId(
    userId: number,
    filter: RefreshPaginateFilterDto,
  ): Promise<Pagination<RefreshTokenSerializer>> {
    const paginationInfo: PaginationInfoInterface =
      this.repository.getPaginationInfo(filter);
    const findOptions: FindManyOptions = {
      where: {
        userId,
        isRevoked: false,
        expires: MoreThanOrEqual(new Date()),
      },
    };
    const { page, skip, limit } = paginationInfo;
    findOptions.take = paginationInfo.limit;
    findOptions.skip = paginationInfo.skip;
    findOptions.order = {
      id: 'DESC',
    };
    const [results, total] = await this.repository.findAndCount(findOptions);
    const serializedResult = this.repository.transformMany(results);
    return new Pagination<RefreshTokenSerializer>({
      results: serializedResult,
      totalItems: total,
      pageSize: limit,
      currentPage: page,
      previous: page > 1 ? page - 1 : 0,
      next: total > skip + limit ? page + 1 : 0,
    });
  }

  /**
   * Revoke refresh token by id
   * @param id
   * @param userId
   */
  async revokeRefreshTokenById(
    id: number,
    userId: ObjectId,
  ): Promise<RefreshToken> {
    const token = await this.repository.findTokenById(id);
    if (!token) {
      throw new NotFoundException();
    }
    if (token.userId !== userId) {
      throw new ForbiddenException();
    }
    token.isRevoked = true;
    await token.save();
    return token;
  }

  async getRefreshTokenGroupedData(field: string) {
    return this.repository
      .createQueryBuilder('token')
      .select(`token.${field} AS type`)
      .where(`token.${field} IS NOT NULL`)
      .addSelect('COUNT(*)::int AS value')
      .groupBy(`token.${field}`)
      .getRawMany();
  }
}
