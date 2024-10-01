import { ObjectId } from 'typeorm';

/**
 * model serializer
 */
export class ModelSerializer {
  _id: ObjectId;
  createdAt: Date;
  [key: string]: any;
}
