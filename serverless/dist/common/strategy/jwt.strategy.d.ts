import { UserRepository } from 'src/auth/user.repository';
import { UserEntity } from 'src/auth/entity/user.entity';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: UserRepository);
    validate(payload: JwtPayloadDto): Promise<UserEntity>;
}
export {};
