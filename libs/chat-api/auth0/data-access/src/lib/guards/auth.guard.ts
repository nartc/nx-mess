import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_ENDPOINT } from '@nx-mess/chat-api/auth0/utils';
import type { Observable } from 'rxjs';

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_ENDPOINT,
      [context.getHandler(), context.getClass()]
    );

    if (isPublic) return true;
    return super.canActivate(context);
  }
}
