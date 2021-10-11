import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UserDto } from '@nx-mess/chat/data-access-api';
import {
  ClientSocketEvents,
  ServerSocketEvents,
} from '@nx-mess/shared/utils-socket-constants';
import { Socket } from 'ngx-socket-io';
import { map, tap } from 'rxjs';
import { AuthActions, AuthSelectors } from '../auth/auth.slice';
import { ConnectedSocketActions } from './socket.slice';

@Injectable()
export class SocketEffect {
  constructor(
    private actions$: Actions,
    private store: Store,
    private socket: Socket
  ) {}

  readonly online$ = createEffect(() =>
    this.socket
      .fromEvent<UserDto[]>(ServerSocketEvents.Online)
      .pipe(
        map((connectedUsers) =>
          ConnectedSocketActions.addMany({ entities: connectedUsers })
        )
      )
  );

  readonly connect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.check.success, AuthActions.login.success),
        tap(({ user }) => {
          if (user) {
            this.socket.connect();
            this.socket.emit(ClientSocketEvents.ClientConnected, user.sub);
          }
        })
      ),
    { dispatch: false }
  );

  readonly disconnect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout.trigger),
        concatLatestFrom(() => this.store.select(AuthSelectors.selectUser)),
        tap(([, user]) => {
          this.socket.disconnect();
          this.socket.emit(ClientSocketEvents.ClientDisconnected, user.sub);
        })
      ),
    { dispatch: false }
  );
}
