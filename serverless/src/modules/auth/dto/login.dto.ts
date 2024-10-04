import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'namHoang' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'namHoang' })
  password: string;
}
