import { BaseEntity } from 'typeorm';
export declare abstract class CustomBaseEntity extends BaseEntity {
    id: number;
    created_at: Date;
    updated_at: Date;
}
