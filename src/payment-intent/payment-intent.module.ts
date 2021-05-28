import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PaymentIntentController } from './controllers/payment-intent.controller';
import { PaymentIntentSchema } from './entities/payment-intent.entity';
import { PaymentIntentEntity } from './entities/payment-intent.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentIntentEntity.name, schema: PaymentIntentSchema },
    ]),
  ],
  controllers: [PaymentIntentController],
})
export class PaymentIntentModule {}
