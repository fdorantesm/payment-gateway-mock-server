import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  FilterQuery,
  Model,
  QueryOptions,
  UpdateWriteOpResult,
} from 'mongoose';

import { PaymentIntentEntity } from '../entities/payment-intent.entity';

@Injectable()
export class PaymentIntentRepository {
  constructor(
    @InjectModel(PaymentIntentEntity.name)
    private readonly model: Model<PaymentIntentEntity>,
  ) {}

  public create(
    paymentIntent: Partial<PaymentIntentEntity>,
  ): Promise<PaymentIntentEntity> {
    return this.model.create(paymentIntent);
  }

  public findOne(
    filter?: FilterQuery<PaymentIntentEntity>,
    options?: QueryOptions,
  ): Promise<PaymentIntentEntity> {
    return this.model.findOne(filter, options).exec();
  }

  public updateOne(
    filter: FilterQuery<PaymentIntentEntity>,
    data: Partial<PaymentIntentEntity>,
    options?: QueryOptions,
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateOne(filter, options).exec();
  }
}
