import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from '../../common/interfaces/document.interface';
import {
  PaymentIntentCreator,
  PaymentIntentStatus,
} from '../types/payment.types';

@Schema({
  collection: 'payment-intents',
  timestamps: true,
  autoIndex: true,
})
export class PaymentIntentEntity extends Document {
  constructor() {
    super();
  }
  @Prop({ type: String, required: true })
  currency: string;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: Object, required: true })
  payer: {
    name: string;
    email: string;
  };

  @Prop({ type: Object, required: true })
  payee: {
    name: string;
    email: string;
    clabe: string;
    reference: string;
  };

  @Prop({ type: Object, required: true })
  metadata: {
    [key: string]: any;
  };

  @Prop({ type: String, required: true })
  successUrl: string;

  @Prop({ type: String, required: true })
  errorUrl: string;

  @Prop({ type: Object, required: true })
  webhookUrl: {
    url: string;
    token: string;
  };

  @Prop({ type: String, required: true })
  status: PaymentIntentStatus;

  enterpriseId: string;

  @Prop({ type: Number, required: true })
  fee: number;

  @Prop({ type: String, required: true })
  concept: string;

  @Prop({ type: String, required: true })
  externalId: string;

  @Prop({ type: String, required: true })
  createdBy: PaymentIntentCreator;
}

export const PaymentIntentSchema =
  SchemaFactory.createForClass(PaymentIntentEntity);
