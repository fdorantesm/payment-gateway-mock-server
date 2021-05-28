import { Body, Controller, Post } from '@nestjs/common';
import { randomString } from 'utility';
import { sample } from 'lodash';

@Controller('charges')
export class ChargeController {
  @Post('/')
  public createCharge(@Body() body: any) {
    return {
      type: 'charge',
      event: 'charge.success',
      authorizationNumber: randomString(16, '01234567890'),
      metadata: body?.metadata || {},
      brand: sample(['visa', 'amex', 'mastercard']),
      cardType: sample(['credit', 'debit']),
      last4: randomString(4, '01234567890'),
      status: 'pending',
    };
  }
}
