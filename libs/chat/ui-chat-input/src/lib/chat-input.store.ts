import { Injectable } from '@angular/core';
import { ImmerComponentStore } from 'ngrx-immer/component-store';
import { map, Observable, Subject, tap, withLatestFrom } from 'rxjs';

export interface ChatInputState {
  message: string;
  status: 'typing' | 'idle';
  sendButtonState: 'enabled' | 'disabled';
}

export const chatInputInitialState: ChatInputState = {
  message: '',
  status: 'idle',
  sendButtonState: 'disabled',
};

export interface ChatInputVm {
  isSendDisabled: boolean;
}

@Injectable()
export class ChatInputStore extends ImmerComponentStore<ChatInputState> {
  readonly message$ = this.select((s) => s.message);
  readonly status$ = this.select((s) => s.status, { debounce: true });
  readonly sendButtonState$ = this.select((s) => s.sendButtonState);

  private readonly sendSubject = new Subject<void>();
  readonly chatOutput$ = this.sendSubject.asObservable().pipe(
    withLatestFrom(this.message$),
    map(([, message]) => message)
  );

  readonly vm$: Observable<ChatInputVm> = this.select(
    this.sendButtonState$,
    (sendButtonState) => ({ isSendDisabled: sendButtonState === 'disabled' }),
    { debounce: true }
  );

  constructor() {
    super(chatInputInitialState);
  }

  readonly setMessage = this.updater<string>((state, message) => {
    state.message = message;
  });

  readonly initEffect = this.effect(($) =>
    $.pipe(
      tap(() => {
        this.messageChangedEffect(this.message$);
      })
    )
  );

  readonly messageChangedEffect = this.effect<string>((message$) =>
    message$.pipe(
      tap((message) => {
        this.patchState({
          status: message ? 'typing' : 'idle',
          sendButtonState: message ? 'enabled' : 'disabled',
        });
      })
    )
  );

  sendMessage() {
    this.sendSubject.next();
  }
}
