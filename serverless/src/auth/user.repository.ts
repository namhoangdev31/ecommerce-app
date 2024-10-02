import { DeepPartial, EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { classToPlain, plainToClass } from 'class-transformer';

import { UserEntity } from 'src/auth/entity/user.entity';
import { UserLoginDto } from 'src/auth/dto/user-login.dto';
import { BaseRepository } from 'src/common/repository/base.repository';
import { UserSerializer } from 'src/auth/serializer/user.serializer';
import { ResetPasswordDto } from 'src/auth/dto/reset-password.dto';
import { UserStatusEnum } from 'src/auth/user-status.enum';
import { ExceptionTitleList } from 'src/common/constants/exception-title-list.constants';
import { StatusCodesList } from 'src/common/constants/status-codes-list.constants';
import { AuthResponse } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity, UserSerializer> {
  /**
   * Lưu trữ người dùng mới
   * @param createUserDto
   * @param token
   */
  async store(
    createUserDto: DeepPartial<UserEntity>,
    token: string,
  ): Promise<UserSerializer> {
    if (!createUserDto.status) {
      createUserDto.status = UserStatusEnum.INACTIVE;
    }
    createUserDto.salt = await bcrypt.genSalt();
    createUserDto.token = token;
    const user = this.create(createUserDto);
    await user.save();
    return this.transform(user);
  }

  /**
   * Đăng nhập người dùng
   * @param userLoginDto
   */
  async loginUser(userLoginDto: UserLoginDto): Promise<AuthResponse> {
    try {
      const { username, password } = userLoginDto;
      const user = await this.findOne({
        where: [{ username: username }, { email: username }],
      });

      if (!user) {
        return {
          error: ExceptionTitleList.InvalidCredentials,
          code: StatusCodesList.InvalidCredentials.toString(),
        };
      }

      if (!(await user.validatePassword(password))) {
        return {
          error: ExceptionTitleList.InvalidCredentials,
          code: StatusCodesList.InvalidCredentials.toString(),
        };
      }

      if (user.status !== UserStatusEnum.ACTIVE) {
        return {
          error: ExceptionTitleList.UserInactive,
          code: StatusCodesList.UserInactive.toString(),
        };
      }

      return { user: this.transform(user) };
    } catch (error) {
      return {
        error: `Lỗi hệ thống ${error}`,
        code: StatusCodesList.InternalServerError.toString(),
      };
    }
  }
  /**
   * Lấy thực thể người dùng để đặt lại mật khẩu
   * @param resetPasswordDto
   */
  async getUserForResetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<UserEntity> {
    const { token } = resetPasswordDto;
    const query = this.createQueryBuilder('user');
    query.where('user.token = :token', { token });
    query.andWhere('user.tokenValidityDate > :date', {
      date: new Date(),
    });
    return query.getOne();
  }

  /**
   * Chuyển đổi người dùng
   * @param model
   * @param transformOption
   */
  transform(model: UserEntity, transformOption = {}): UserSerializer {
    return plainToClass(
      UserSerializer,
      classToPlain(model, transformOption),
      transformOption,
    );
  }

  /**
   * Chuyển đổi bộ sưu tập người dùng
   * @param models
   * @param transformOption
   */
  transformMany(models: UserEntity[], transformOption = {}): UserSerializer[] {
    return models.map((model) => this.transform(model, transformOption));
  }
}
