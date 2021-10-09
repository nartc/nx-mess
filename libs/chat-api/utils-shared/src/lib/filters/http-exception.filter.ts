import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiException } from '@nx-mess/chat-api/data-access-shared';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse() as Response;
    const req = ctx.getRequest() as Request;
    const statusCode = exception.getStatus();
    const stackTrace = exception.stack;
    const errorResponse = exception.getResponse() as Record<string, unknown>;
    let errorName = exception.name;
    let errors = null;

    if (typeof errorResponse === 'object') {
      errorName = (errorResponse['name'] ||
        errorResponse['error'] ||
        exception.name) as string;
      errors = errorResponse['errors'];

      if (statusCode === HttpStatus.UNAUTHORIZED) {
        errorResponse['message'] = errorResponse['message'] || 'Unauthorized';
      }
    }

    const path = req?.url;
    const apiException = new ApiException(
      errorResponse['message'] as string,
      errorName,
      statusCode,
      stackTrace,
      errors,
      path
    );
    res.status(statusCode).json(apiException);
  }
}
