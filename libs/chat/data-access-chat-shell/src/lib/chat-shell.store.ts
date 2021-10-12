import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserDto } from '@nx-mess/chat/data-access-api';
import { AuthSelectors, ConnectedSocketActions } from '@nx-mess/shared/store';
import {
  ClientSocketEvents,
  ServerSocketEvents,
} from '@nx-mess/shared/utils-socket-constants';
import { ImmerComponentStore } from 'ngrx-immer/component-store';
import { Socket } from 'ngx-socket-io';
import { distinctUntilKeyChanged, Observable, tap, withLatestFrom } from 'rxjs';

export interface ChatShellState {
  selectedTab: 'general' | 'friends' | 'me';
  generalBadgeCount: number;
  friendsBadgeCount: number;
}

export const chatShellInitialState: ChatShellState = {
  selectedTab: 'general',
  generalBadgeCount: 0,
  friendsBadgeCount: 0,
};

export interface ChatShellVm {
  generalBadgeCount: number;
  hasGeneralBadge: boolean;
  friendsBadgeCount: number;
  hasFriendsBadge: boolean;
}

@Injectable()
export class ChatShellStore extends ImmerComponentStore<ChatShellState> {
  readonly selectedTab$ = this.select((s) => s.selectedTab);
  readonly friendsBadgeCount$ = this.select((s) => s.friendsBadgeCount);
  readonly generalBadgeCount$ = this.select((s) => s.generalBadgeCount);

  readonly vm$: Observable<ChatShellVm> = this.select(
    this.friendsBadgeCount$,
    this.generalBadgeCount$,
    (friendsBadgeCount, generalBadgeCount) => ({
      friendsBadgeCount,
      generalBadgeCount,
      hasFriendsBadge: friendsBadgeCount > 0,
      hasGeneralBadge: generalBadgeCount > 0,
    }),
    { debounce: true }
  );

  constructor(private socket: Socket, private store: Store) {
    super(chatShellInitialState);
  }

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

  readonly updateSelectedTabEffect = this.effect<string>((selectedTab$) =>
    selectedTab$.pipe(
      tap((selectedTab) => {
        switch (selectedTab) {
          case 'general':
            this.updateGeneralBadgeCountEffect('reset');
            break;
          case 'friends':
            this.updateFriendsBadgeCountEffect('reset');
            break;
        }
        this.patchState({
          selectedTab: selectedTab as ChatShellState['selectedTab'],
        });
      })
    )
  );

  readonly updateGeneralBadgeCountEffect = this.effect<'increment' | 'reset'>(
    (updateType$) =>
      updateType$.pipe(
        withLatestFrom(this.selectedTab$),
        tap(([updateType, selectedTab]) => {
          if (updateType === 'reset') {
            this.patchState({ generalBadgeCount: 0 });
          } else {
            if (selectedTab !== 'general') {
              this.patchState((state) => ({
                generalBadgeCount: state.generalBadgeCount + 1,
              }));
            }
          }
        })
      )
  );

  readonly updateFriendsBadgeCountEffect = this.effect<'increment' | 'reset'>(
    (updateType$) =>
      updateType$.pipe(
        withLatestFrom(this.selectedTab$),
        tap(([updateType, selectedTab]) => {
          if (updateType === 'reset') {
            this.patchState({ friendsBadgeCount: 0 });
          } else {
            if (selectedTab !== 'friends') {
              this.patchState((state) => ({
                friendsBadgeCount: state.friendsBadgeCount + 1,
              }));
            }
          }
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
