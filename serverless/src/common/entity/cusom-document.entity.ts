import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

// export abstract class CustomDocument extends Document {
//   @Prop({ type: Types.ObjectId, required: true })
//   id: Types.ObjectId;
//
//   @Prop({ type: Date, default: Date.now })
//   createdAt: Date;
//
//   @Prop({ type: Date, default: Date.now })
//   updatedAt: Date;
// }