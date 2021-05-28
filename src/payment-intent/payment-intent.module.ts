import { Module } from '@nestjs/common';
import { PaymentIntentController } from './payment-intent.controller';

@Module({
  controllers: [PaymentIntentController],
})
export class PaymentIntentModule {}
