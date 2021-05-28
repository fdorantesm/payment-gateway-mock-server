import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PaymentIntentModule } from './payment-intent/payment-intent.module';
import { HookModule } from './hook/hook.module';
import { ChargeModule } from './charge/charge.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoreModule,
    PaymentIntentModule,
    HookModule,
    ChargeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
