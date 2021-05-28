import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    request.data = { ...request.body, ...request.query };
    return request.data;
  },
);
