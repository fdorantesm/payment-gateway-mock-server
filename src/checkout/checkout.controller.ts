import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { base64decode, base64encode, randomString } from 'utility';
import * as faker from 'faker';

@Controller('checkout')
export class CheckoutController {
  @Post('/')
  public createUrl(@Body() body: any) {
    const data = JSON.stringify({
      currency: body.currency || faker.random.arrayElement(['USD', 'MXN']),
      amount: body.amount || faker.finance.amount(),
      payer: {
        name: body?.payer?.name || faker.company.companyName(),
        email: body?.payer?.email || faker.internet.email(),
      },
      payee: {
        name: body?.payee?.name || faker.company.companyName(),
        clabe: body?.payee?.bankAccount || faker.finance.routingNumber(),
        email: body?.payee?.email || faker.internet.email(),
      },
      metadata: body.metadata || {},
      successUrl: body.successUrl || faker.internet.url(),
      errorUrl: body.errorUrl || faker.internet.url(),
      hook: {
        url: body.hook.url || faker.internet.url(),
        token: body.hook.token || faker.datatype.string(32),
      },
    });
    return {
      url: `${process.env.BASE_URL}/checkout/?q=${base64encode(data)}`,
    };
  }

  @Get('/')
  public checkoutData(@Query('q') hash: string) {
    try {
      const data = JSON.parse(base64decode(hash).toString());
      return data;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
