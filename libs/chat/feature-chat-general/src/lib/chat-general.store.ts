import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import {
  CreateGeneralMessageDto,
  MessageDto,
  MessagesApiService,
  UserDto,
} from '@nx-mess/chat/data-access-api';
import {
  GeneralMessageActions,
  GeneralMessageSelectors,
} from '@nx-mess/chat/data-access-chat-general';
import { ChatShellStore } from '@nx-mess/chat/data-access-chat-shell';
import { AuthSelectors, ConnectedSocketSelectors } from '@nx-mess/shared/store';
import { arrayPartition } from '@nx-mess/shared/utils-array-partition';
import {
  ClientSocketEvents,
  ServerSocketEvents,
} from '@nx-mess/shared/utils-socket-constants';
import { Socket } from 'ngx-socket-io';
import { concatMap, delay, Observable, tap, withLatestFrom } from 'rxjs';

export interface ChatGeneralState {
  whoIsTyping: string[];
}

export const chatGeneralInitialState: ChatGeneralState = {
  whoIsTyping: [],
};

export interface ChatGeneralVm {
  successMessages: MessageDto[];
  eagerMessage: MessageDto;
  whoIsTyping: UserDto[];
}

@Injectable()
export class ChatGeneralStore extends ComponentStore<ChatGeneralState> {
  readonly whoIsTyping$ = this.select((s) => s.whoIsTyping);

  readonly vm$: Observable<ChatGeneralVm> = this.select(
    this.store.select(GeneralMessageSelectors.selectAll),
    this.whoIsTyping$,
    this.store.select(ConnectedSocketSelectors.selectEntities),
    (messages, whoIsTyping, connectedSockets) => {
      const [successMessages, eagerMessages] = arrayPartition(
        messages,
        (message) => message.isSuccess
      );
      return {
        successMessages,
        eagerMessage: eagerMessages[0],
        whoIsTyping: whoIsTyping.map((personId) => connectedSockets[personId]),
      };
    },
    { debounce: true }
  );

  constructor(
    private store: Store,
    private socket: Socket,
    private messagesApiService: MessagesApiService,
    private chatShellStore: ChatShellStore
  ) {
    super(chatGeneralInitialState);
  }

  readonly initEffect = this.effect(($) =>
    $.pipe(
      tap(() => {
        this.getMessagesEffect();

        const whoIsTyping$ = this.socket.fromEvent<string[]>(
          ServerSocketEvents.WhoIsTyping
        );
        this.listenWhoIsTypingEffect(whoIsTyping$);

        const broadcastGeneralMessage$ = this.socket.fromEvent<MessageDto>(
          ServerSocketEvents.BroadcastGeneralMessage
        );
        this.listenServerGeneralMessageEffect(broadcastGeneralMessage$);
      })
    )
  );

  readonly sendMessageEffect = this.effect<string>((message$) =>
    message$.pipe(
      concatMap((message) => {
        const createGeneralMessageDto: CreateGeneralMessageDto = { message };

        const tempMessageId = Date.now().toString();

        // TODO: prevent flashing because message might be really fast
        this.store.dispatch(
          GeneralMessageActions.addEager({
            eagerMessage: {
              id: tempMessageId,
              text: message,
            },
          })
        );

        return this.messagesApiService
          .createGeneralMessage(createGeneralMessageDto)
          .pipe(
            delay(1000), // simulate 1s delay to show eager message
            tapResponse(
              (messageDto) => {
                this.store.dispatch(
                  GeneralMessageActions.addSuccess({
                    id: tempMessageId,
                    changes: { ...messageDto, isSuccess: true },
                  })
                );
                this.socket.emit(
                  ClientSocketEvents.SendGeneralMessage,
                  messageDto
                );
              },
              () => {
                this.store.dispatch(
                  // TODO: apply Retry mechanism
                  GeneralMessageActions.removeEager({ key: tempMessageId })
                );
              }
            )
          );
      })
    )
  );

  readonly setTypingEffect = this.effect<boolean>((isTyping$) =>
    isTyping$.pipe(
      withLatestFrom(this.store.select(AuthSelectors.selectUser)),
      tap(([isTyping, user]) => {
        if (user) {
          this.socket.emit(ClientSocketEvents.Typing, {
            isTyping,
            userId: user.sub,
          });
        }
      })
    )
  );

  private readonly getMessagesEffect = this.effect(($) =>
    $.pipe(
      tap(() => {
        this.store.dispatch(GeneralMessageActions.load.trigger());
      })
    )
  );

  private readonly listenServerGeneralMessageEffect = this.effect<MessageDto>(
    (message$) =>
      message$.pipe(
        tap((message) => {
          this.store.dispatch(
            GeneralMessageActions.addServer({
              entity: { ...message, isSuccess: true },
            })
          );
          this.chatShellStore.updateGeneralBadgeCountEffect('increment');
        })
      )
  );

  private readonly listenWhoIsTypingEffect = this.effect<string[]>(
    (typingPeople$) =>
      typingPeople$.pipe(
        withLatestFrom(this.store.select(AuthSelectors.selectUser)),
        tap(([typingPeople, user]) => {
          this.patchState({
            whoIsTyping: typingPeople.filter(
              (personId) => personId !== user.sub
            ),
          });
        })
      )
  );
}
