import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';

@Module({
  controllers: [CheckoutController],
})
export class UrlModule {}
