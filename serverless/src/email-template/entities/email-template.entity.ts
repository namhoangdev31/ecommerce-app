import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'email_templates',
})
export class EmailTemplateEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({
    unique: true,
  })
  title: string;

  @Column()
  slug: string;

  @Column()
  sender: string;

  @Column()
  subject: string;

  @Column('text')
  body: string;

  @Column()
  isDefault: boolean;
}
