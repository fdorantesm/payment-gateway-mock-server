import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { type } from 'ramda';
import { JsonType } from '../../common/types/json.type';

export interface Response<T> {
  statusCode: number;
  data?: any;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data?: string | number | JsonType) => {
        const response = context.switchToHttp().getResponse();

        if (data === undefined) {
          response.status(204);
          return;
        } else if (data === null) {
          response.status(404);
          return;
        }

        return {
          data,
          statusCode: context.switchToHttp().getResponse().statusCode,
          type: type(data),
        };
      }),
    );
  }
}
