import { Document as MongooseDocument, Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';

type Document = MongooseDocument & { uuid?: string };

export function mongooseUuid(schema: Schema): void {
  schema.add({
    uuid: {
      type: String,
      unique: true,
      index: true,
    },
  });

  schema.pre('save', function (next: Function) {
    const document: Document = this;
    document.uuid = uuid();
    next();
  });
}
