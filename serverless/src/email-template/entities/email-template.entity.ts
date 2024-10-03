import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';

@Entity({
  name: 'email_templates',
})
export class EmailTemplateEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  sender: string;

  @Column()
  subject: string;

  @Column('varchar')
  body: string;

  @Column()
  isDefault: boolean;
}
