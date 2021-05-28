import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UrlModule } from './checkout/checkout.module';
import { HookModule } from './hook/hook.module';
import { ChargeModule } from './charge/charge.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoreModule,
    UrlModule,
    HookModule,
    ChargeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
