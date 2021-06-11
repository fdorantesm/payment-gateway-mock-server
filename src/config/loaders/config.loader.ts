import { ServerConfigType } from '../types/server.type';
import { MongodbConfigType } from '../types/mongodb.type';

export const configLoader = (): ConfigLoader => ({
  server: {
    tz: process.env.TZ || 'UTC',
    port: parseInt(process.env.APP_PORT, 10),
    pmiSerial: process.env.PMI_SERIAL,
  },
  mongodb: {
    host: process.env.MONGODB_HOST,
    port: parseInt(process.env.MONGODB_PORT),
    database: process.env.MONGODB_DATABASE,
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
  },
});

type ConfigLoader = {
  server: ServerConfigType;
  mongodb: MongodbConfigType;
};
