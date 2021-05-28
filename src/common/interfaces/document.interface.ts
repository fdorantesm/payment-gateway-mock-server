import { Prop } from '@nestjs/mongoose';
import { Document as MongooseDocument } from 'mongoose';

export class Document extends MongooseDocument {
  @Prop({ type: String, required: true })
  uuid: string;
}
