import { Injectable } from '@nestjs/common';
import { FilterQuery, QueryOptions } from 'mongoose';

import { PaymentIntentEntity } from '../entities/payment-intent.entity';
import { PaymentIntentRepository } from '../repositories/payment-intent.repository';

@Injectable()
export class PaymentIntentService {
  constructor(private readonly repository: PaymentIntentRepository) {}

  public create(
    paymentIntent: Partial<PaymentIntentEntity>,
  ): Promise<PaymentIntentEntity> {
    return this.repository.create(paymentIntent);
  }

  public findOne(
    filter?: FilterQuery<PaymentIntentEntity>,
    options?: QueryOptions,
  ): Promise<PaymentIntentEntity> {
    return this.repository.findOne(filter, options);
  }

  public updateOne(
    filter: FilterQuery<PaymentIntentEntity>,
    data: Partial<PaymentIntentEntity>,
    options?: QueryOptions,
  ): Promise<PaymentIntentEntity> {
    return this.repository
      .updateOne(filter, data, options)
      .then((_result) => this.findOne(filter));
  }
}
