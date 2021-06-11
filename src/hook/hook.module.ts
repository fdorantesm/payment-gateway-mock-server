import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { HookController } from './hook.controller';

@Module({
  imports: [ConfigModule],
  controllers: [HookController],
})
export class HookModule {}
