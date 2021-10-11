import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageDto } from '@nx-mess/chat/data-access-api';
import { AuthSelectors } from '@nx-mess/shared/store';
import { ImmerComponentStore } from 'ngrx-immer/component-store';
import { Observable } from 'rxjs';

export interface MessagesContainerState {
  messages: MessageDto[];
}

export interface MessagesContainerVm {
  messages: (MessageDto & { isSelf: boolean })[];
}

export const messagesContainerInitialState: MessagesContainerState = {
  messages: [],
};

@Injectable()
export class MessagesContainerStore extends ImmerComponentStore<MessagesContainerState> {
  readonly messages$ = this.select((s) => s.messages);

  readonly vm$: Observable<MessagesContainerVm> = this.select(
    this.messages$,
    this.store.select(AuthSelectors.selectUser),
    (messages, user) => ({
      messages: messages.map((message) => ({
        ...message,
        isSelf: message.sender.userId === user.sub,
      })),
    }),
    { debounce: true }
  );

  constructor(private store: Store) {
    super(messagesContainerInitialState);
  }

  readonly setMessages = this.updater<MessageDto[]>((state, messages) => {
    state.messages = messages;
  });
}
