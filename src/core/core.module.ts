import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { mongodbConfigLoader } from '../config/loaders';
import { options } from '../config/options/config.options';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ConnectionString } from 'connection-string';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot(options),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(mongodbConfigLoader)],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        let uri: string;
        const config = configService.get('mongodb');

        uri = new ConnectionString('', {
          protocol: config.port ? 'mongodb' : 'mongodb+srv',
          hosts: [{ name: config.host, port: config.port }],
        }).toString();

        return {
          uri,
          dbName: config.database,
          auth: {
            user: config.user,
            password: config.password,
          },
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          connectionFactory: async (
            connection: mongoose.Connection,
          ): Promise<mongoose.Connection> => {
            return connection;
          },
        };
      },
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class CoreModule {}
