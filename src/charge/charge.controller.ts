import { Body, Controller, Post } from '@nestjs/common';
import { base64decode, base64encode, randomString } from 'utility';
import { sample } from 'lodash';

@Controller('charges')
export class ChargeController {
  @Post('/')
  public createCharge(@Body() body: any) {
    const numbers = base64decode(body?.code || 'NDE5OTkw').toString();
    const first2 = numbers.slice(0, 2) || '41';
    const last4 = numbers.slice(2) || '9971';
    const code = base64encode(first2 + last4);
    let brand: string;

    if (first2.startsWith('5')) {
      brand = 'mastercard';
    } else if (first2.startsWith('4')) {
      brand = 'visa';
    } else if (['34', '37'].includes(first2)) {
      brand = 'amex';
    } else {
      brand = 'other';
    }

    return {
      type: 'charge',
      paymentMethod: 'card',
      event: 'charge.success',
      transactionReference: randomString(16, '01234567890'),
      metadata: body?.metadata || {},
      brand,
      last4,
      first2,
      code,
      status: 'pending',
    };
  }
}
