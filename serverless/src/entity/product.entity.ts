import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  imageSrcPath: string | null;

  @Column({ nullable: true })
  deployUrl: string | null;

  @Column()
  productName: string;

  @Column()
  overview: string;

  @Column()
  mainTechnology: string;

  @Column({ nullable: true })
  subTechnology: string | null;

  @Column('text', { array: true, nullable: true })
  productLinks: string[] | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
