import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from '../../common/interfaces/document.interface';
import {
  PaymentIntentCreator,
  PaymentIntentStatus,
} from '../types/payment.types';

@Schema({
  collection: 'paymentIntents',
  timestamps: true,
  autoIndex: true,
})
export class PaymentIntentEntity extends Document {
  @Prop({ type: String, required: true })
  public currency: string;

  @Prop({ type: Number, required: true })
  public amount: number;

  @Prop({ type: Object, required: true })
  public payer: {
    name: string;
    email: string;
  };

  @Prop({ type: Object, required: true })
  public payee: {
    name: string;
    email: string;
    clabe: string;
    reference: string;
  };

  @Prop({ type: Object, required: true })
  public metadata: {
    [key: string]: any;
  };

  @Prop({ type: String, required: true })
  public successUrl: string;

  @Prop({ type: String, required: true })
  public errorUrl: string;

  @Prop({ type: Object, required: true })
  public webhookUrl: {
    url: string;
    token: string;
  };

  @Prop({ type: String, required: true })
  public status: PaymentIntentStatus;

  enterpriseId: string;

  @Prop({ type: Number, required: true })
  public fee: number;

  @Prop({ type: String, required: true })
  public concept: string;

  @Prop({ type: String })
  public externalId?: string;

  @Prop({ type: String, required: true })
  public createdBy: PaymentIntentCreator;
}

export const PaymentIntentSchema =
  SchemaFactory.createForClass(PaymentIntentEntity);
