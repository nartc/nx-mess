import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { UserDto } from '@nx-mess/shared/data-access-api';
import { AuthSelectors, ConnectedSocketActions } from '@nx-mess/shared/store';
import {
  ClientSocketEvents,
  ServerSocketEvents,
} from '@nx-mess/shared/utils-socket-constants';
import { Socket } from 'ngx-socket-io';
import { distinctUntilKeyChanged, tap, withLatestFrom } from 'rxjs';

export interface ChatShellState {
  selectedTab: 'general' | 'friends' | 'me';
}

export const chatShellInitialState: ChatShellState = {
  selectedTab: 'general',
};

@Injectable()
export class ChatShellStore extends ComponentStore<ChatShellState> {
  readonly selectedTab$ = this.select((s) => s.selectedTab);

  constructor(private socket: Socket, private store: Store) {
    super(chatShellInitialState);
  }

  readonly setSelectedTab = this.updater<string>((state, selectedTab) => ({
    ...state,
    selectedTab: selectedTab as ChatShellState['selectedTab'],
  }));

  readonly initEffect = this.effect(($) =>
    $.pipe(
      tap(() => {
        this.userOnlineEffect(
          this.socket
            .fromEvent<UserDto>(ServerSocketEvents.UserOnline)
            .pipe(distinctUntilKeyChanged('userId'))
        );
        this.userOfflineEffect(
          this.socket
            .fromEvent<UserDto>(ServerSocketEvents.UserOffline)
            .pipe(distinctUntilKeyChanged('userId'))
        );
      })
    )
  );

  readonly userOnlineEffect = this.effect<UserDto>((user$) =>
    user$.pipe(
      tap((user) => {
        this.store.dispatch(ConnectedSocketActions.add({ entity: user }));
      })
    )
  );

  readonly userOfflineEffect = this.effect<UserDto>((user$) =>
    user$.pipe(
      tap((user) => {
        this.store.dispatch(ConnectedSocketActions.remove({ key: user.id }));
      })
    )
  );

  readonly disconnectEffect = this.effect(($) =>
    $.pipe(
      withLatestFrom(this.store.select(AuthSelectors.selectUser)),
      tap(([, user]) => {
        this.socket.emit(ClientSocketEvents.ClientDisconnected, user.sub);
      })
    )
  );

  ngOnDestroy() {
    super.ngOnDestroy();
    this.socket.disconnect();
    this.disconnectEffect();
  }
}
