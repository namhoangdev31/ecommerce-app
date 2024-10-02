import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { CommonSearchFieldDto } from 'src/common/extra/common-search-field.dto';

export class UserSearchFilterDto extends PartialType(CommonSearchFieldDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name?: string;
}
