import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'namHoang@example.com' }) // Cập nhật ví dụ cho email
  email: string;

  @IsString()
  @ApiProperty({ example: 'password123' }) // Cập nhật ví dụ cho mật khẩu
  password: string;
}
