import { Module } from '@nestjs/common';
import { UrlModule } from './checkout/checkout.module';
import { HookModule } from './hook/hook.module';
import { ChargeModule } from './charge/charge.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), UrlModule, HookModule, ChargeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
