import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

import { configSchema } from '../schemas/config.schema';
import { serverConfigLoader } from '../loaders/server.loader';

export const options: ConfigModuleOptions = {
  cache: true,
  isGlobal: true,
  load: [serverConfigLoader],
  validationSchema: configSchema,
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
};
