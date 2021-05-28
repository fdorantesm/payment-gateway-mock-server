import { Schema } from 'mongoose';

export function mongooseHideObjectId(schema: Schema): void {
  schema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });
}
