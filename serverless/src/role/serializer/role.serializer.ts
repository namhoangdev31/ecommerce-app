import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { ModelSerializer } from 'src/common/serializer/model.serializer';
import { Permission } from 'src/permission/serializer/permission.serializer';

export const adminUserGroupsForSerializing: string[] = ['admin'];
export const basicFieldGroupsForSerializing: string[] = ['basic'];

export class RoleSerializer extends ModelSerializer {
  id: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  @Expose({
    groups: basicFieldGroupsForSerializing,
  })
  description: string;

  @Type(() => Permission)
  permission: Permission[];

  @ApiPropertyOptional()
  @Expose({
    groups: basicFieldGroupsForSerializing,
  })
  created_at: Date;

  @ApiPropertyOptional()
  @Expose({
    groups: basicFieldGroupsForSerializing,
  })
  updated_at: Date;
}
