import * as faker from 'faker';
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Headers,
} from '@nestjs/common';
import { PaymentIntentService } from '../services/payment-intent.service';

const baseUrl = 'payment-intents';

@Controller(baseUrl)
export class PaymentIntentController {
  constructor(private readonly paymentIntentService: PaymentIntentService) {}

  @Post('/')
  public async createUrl(@Body() body: any, @Headers() headers: any) {
    const data: any = {
      externalId: body?.externalId,
      platformId: headers?.Authorization || faker.datatype.uuid(),
      currency: body?.currency || faker.random.arrayElement(['USD', 'MXN']),
      amount: body?.amount || faker.finance.amount(),
      concept: faker.finance.transactionType(),
      payer: {
        name: body?.payer?.name || faker.company.companyName(),
        email: body?.payer?.email || faker.internet.email(),
      },
      payee: {
        alias: body?.payee?.alias || faker.company.companyName(),
        bankAccountNumber:
          body?.payee?.bankAccountNumber || faker.finance.account(18),
        email: body?.payee?.email || faker.internet.email(),
        reference: body?.payee?.reference || faker.finance.account(8),
      },
      metadata: body?.metadata || {},
      successUrl: body?.successUrl || faker.internet.url(),
      errorUrl: body?.errorUrl || faker.internet.url(),
    };

    const paymentItent = await this.paymentIntentService.create(data);
    return {
      uuid: paymentItent.uuid,
    };
  }

  @Get('/:uuid')
  public async checkoutData(@Param('uuid') uuid: string) {
    try {
      const paymentIntent = await this.paymentIntentService.findOne({ uuid });
      return paymentIntent.toJSON();
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
