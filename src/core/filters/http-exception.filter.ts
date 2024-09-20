import { Catch, ArgumentsHost, HttpException, HttpStatus, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaClientValidationError, PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

type MyResponseObj = {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string | object;
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const myResponseObj: MyResponseObj = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: 'Internal Server Error',
    };

    if (exception instanceof HttpException) {
      myResponseObj.statusCode = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'object' && res.hasOwnProperty('message')) {
        if (Array.isArray(res['message'])) {
          myResponseObj.message = res['message'][0]; // Take the first validation error
        } else {
          myResponseObj.message = res['message'];
        }
      } else {
        myResponseObj.message = res;
      }
    } else if (exception instanceof PrismaClientValidationError) {
      myResponseObj.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      myResponseObj.message = exception.message.replace(/\n/g, ' ');
    } else if (exception instanceof PrismaClientKnownRequestError) {
      myResponseObj.statusCode = HttpStatus.BAD_REQUEST;
      myResponseObj.message = exception.message.replace(/\n/g, ' ');
    } else if (exception instanceof TypeError) {
      myResponseObj.statusCode = HttpStatus.BAD_REQUEST;
      myResponseObj.message = 'Bad Request: Invalid input data.';
    } else {
      myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      myResponseObj.message = 'Internal Server Error';
    }

    if (response && typeof response.status === 'function') {
      response.status(myResponseObj.statusCode).json(myResponseObj);
    } else {
      console.error('Response object is undefined or malformed:', response);
      console.error('Exception:', exception);
    }
  }
}
