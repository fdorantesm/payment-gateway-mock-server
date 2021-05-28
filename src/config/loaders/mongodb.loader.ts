import { registerAs } from '@nestjs/config';

import { MongodbConfigType } from '../types/mongodb.type';
import { configLoader } from './config.loader';

export const mongodbConfigLoader = registerAs(
  'mongodb',
  (): MongodbConfigType => configLoader().mongodb,
);
