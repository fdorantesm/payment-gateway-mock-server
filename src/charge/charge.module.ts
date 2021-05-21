import { Module } from '@nestjs/common';
import { ChargeController } from './charge.controller';

@Module({
  controllers: [ChargeController],
})
export class ChargeModule {}
