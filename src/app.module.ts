import { Module } from '@nestjs/common';
import { UrlModule } from './url/url.module';
import { HookModule } from './hook/hook.module';

@Module({
  imports: [UrlModule, HookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
