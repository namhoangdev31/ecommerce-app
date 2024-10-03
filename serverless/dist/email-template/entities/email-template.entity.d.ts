import { BaseEntity } from 'typeorm';
export declare class EmailTemplateEntity extends BaseEntity {
    id: number;
    title: string;
    slug: string;
    sender: string;
    subject: string;
    body: string;
    isDefault: boolean;
}
