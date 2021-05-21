import { Controller, Post } from '@nestjs/common';
import { randomString } from 'utility';
import { sample } from 'lodash';

@Controller('charge')
export class ChargeController {
  @Post('/')
  public createCharge() {
    return {
      type: 'charge',
      event: 'charge.success',
      authorizationNumber: randomString(16, '01234567890'),
      metadata: {},
      brand: sample(['visa', 'amex', 'mastercard']),
      cardType: sample(['credit', 'debit']),
      last4: randomString(4, '01234567890'),
      status: 'pending',
    };
  }
}
