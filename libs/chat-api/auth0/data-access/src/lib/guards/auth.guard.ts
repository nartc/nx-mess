import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { ALLOW_ANONYMOUS } from '@nx-mess/chat-api/shared/utils';
import type { Observable } from 'rxjs';

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isAllowAnonymous =
      this.reflector.getAllAndOverride<boolean>(ALLOW_ANONYMOUS, [
        context.getHandler(),
        context.getClass(),
      ]) || false;

    if (isAllowAnonymous) return true;
    return super.canActivate(context);
  }
}
