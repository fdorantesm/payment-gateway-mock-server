import * as Joi from 'joi';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'testing')
    .default('development'),
  PORT: Joi.number().required(),
  MONGODB_HOST: Joi.string().default('localhost'),
  MONGODB_PORT: Joi.number().integer().allow(null, '').optional(),
  MONGODB_USER: Joi.string(),
  MONGODB_PASSWORD: Joi.string().allow('', null),
  MONGODB_DATABASE: Joi.string().required(),
});
