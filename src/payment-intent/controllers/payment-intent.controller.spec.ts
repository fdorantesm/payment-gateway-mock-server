import { Test, TestingModule } from '@nestjs/testing';

import { PaymentIntentController } from './payment-intent.controller';

describe('PaymentIntentController', () => {
  let controller: PaymentIntentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentIntentController],
    }).compile();

    controller = module.get<PaymentIntentController>(PaymentIntentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
