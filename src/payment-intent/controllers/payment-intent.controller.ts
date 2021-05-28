import { base64decode, base64encode } from 'utility';
import * as faker from 'faker';
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PaymentIntentService } from '../services/payment-intent.service';

const baseUrl = 'payment-intents';

@Controller(baseUrl)
export class PaymentIntentController {
  constructor(private readonly paymentIntentService: PaymentIntentService) {}

  @Post('/')
  public async createUrl(@Body() body: any) {
    const data: any = {
      currency: body.currency || faker.random.arrayElement(['USD', 'MXN']),
      amount: body.amount || faker.finance.amount(),
      concept: faker.finance.transactionType(),
      payer: {
        name: body?.payer?.name || faker.company.companyName(),
        email: body?.payer?.email || faker.internet.email(),
      },
      payee: {
        name: body?.payee?.name || faker.company.companyName(),
        clabe: body?.payee?.bankAccount || faker.finance.routingNumber(),
        email: body?.payee?.email || faker.internet.email(),
        reference:
          body?.payee?.reference || faker.finance.transactionDescription(),
      },
      metadata: body.metadata || {},
      successUrl: body.successUrl || faker.internet.url(),
      errorUrl: body.errorUrl || faker.internet.url(),
      webhookUrl: {
        url: body.hook.url || faker.internet.url(),
        token: body.hook.token || faker.datatype.string(32),
      },
    };

    const paymentItent = await this.paymentIntentService.create(data);
    return {
      url: `${process.env.BASE_URL}/${baseUrl}/${paymentItent.uuid}`,
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
