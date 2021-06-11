import {
  Body,
  Controller,
  Logger,
  Post,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ServerConfigType } from '../config/types/server.type';

@Controller('/webhooks/pmi')
export class HookController {
  constructor(private readonly configService: ConfigService) {}

  @Post('/')
  public handle(@Body() body: any, @Headers() headers: any): void {
    const config = this.configService.get<ServerConfigType>('server');
    if (headers?.authorization?.replace(/Bearer\s/, '') !== config.pmiSerial) {
      throw new UnauthorizedException();
    }
    Logger.log(body, 'PMI Webhook');
  }
}
