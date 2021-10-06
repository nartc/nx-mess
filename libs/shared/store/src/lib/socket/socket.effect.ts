import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Socket } from 'ngx-socket-io';
import { tap } from 'rxjs';
import { AuthActions } from '../auth/auth.slice';

@Injectable()
export class SocketEffect {
  constructor(private actions$: Actions, private socket: Socket) {}

  readonly connect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.check.success, AuthActions.login.success),
        tap(({ user }) => {
          if (user) {
            this.socket.connect();
          }
        })
      ),
    { dispatch: false }
  );

  readonly disconnect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout.success),
        tap(() => {
          this.socket.disconnect();
        })
      ),
    { dispatch: false }
  );
}
