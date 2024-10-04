import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  INVALID_PASSWORD_FORMAT,
  INVALID_PASSWORD_LENGTH,
} from '../../shared/constants/strings.constants';

export type UserDocument = HydratedDocument<User>;

@Injectable()
@Schema({ timestamps: true })
export class User {
  @ApiProperty({ description: 'The name of the user' }) // Swagger property
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The email of the user', uniqueItems: true }) // Swagger property
  @Prop({ unique: true, required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    minLength: 8,
    example: 'Password123!',
  }) // Swagger property
  @Prop({ required: true })
  @Exclude({ toPlainOnly: true })
  @MinLength(8, { message: INVALID_PASSWORD_LENGTH })
  @Matches(/(?=.*[A-Za-z])(?=.*\d)(?=.*[$@!%*^#?&])/, {
    message: INVALID_PASSWORD_FORMAT,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
