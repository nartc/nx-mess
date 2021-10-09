import { HttpStatus } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ApiException {
  @ApiPropertyOptional() statusCode?: number;
  @ApiPropertyOptional() message?: string;
  @ApiPropertyOptional() status?: string;
  @ApiPropertyOptional() error?: string;
  @ApiPropertyOptional() errors?: unknown;
  @ApiPropertyOptional() timestamp?: string;
  @ApiPropertyOptional() path?: string;
  @ApiPropertyOptional() stack?: string;

  constructor(
    message: string,
    error: string,
    statusCode: number,
    stack?: string,
    errors?: unknown,
    path?: string
  ) {
    this.message = message;
    this.error = error;
    this.stack = stack;
    this.errors = errors;
    this.path = path;
    this.timestamp = new Date().toISOString();
    this.statusCode = statusCode;
    this.status = HttpStatus[statusCode];
  }
}
