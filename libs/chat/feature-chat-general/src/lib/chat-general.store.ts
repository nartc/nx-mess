import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import {
  CreateGeneralMessageDto,
  MessageDto,
  MessagesApiService,
} from '@nx-mess/chat/data-access-api';
import {
  GeneralMessageActions,
  GeneralMessageSelectors,
} from '@nx-mess/chat/data-access-chat-general';
import { AuthSelectors, NonNullAuthUser } from '@nx-mess/shared/store';
import { arrayPartition } from '@nx-mess/shared/utils-array-partition';
import {
  ClientSocketEvents,
  ServerSocketEvents,
} from '@nx-mess/shared/utils-socket-constants';
import { Socket } from 'ngx-socket-io';
import { concatMap, Observable, tap, withLatestFrom } from 'rxjs';

export interface ChatGeneralVm {
  user: NonNullAuthUser;
  successMessages: MessageDto[];
  eagerMessage: MessageDto;
}

@Injectable()
export class ChatGeneralStore extends ComponentStore<{}> {
  readonly user$ = this.store.select(AuthSelectors.selectUser);

  readonly vm$: Observable<ChatGeneralVm> = this.select(
    this.user$,
    this.store.select(GeneralMessageSelectors.selectAll),
    (user, messages) => {
      const [successMessages, eagerMessages] = arrayPartition(
        messages,
        (message) => message.isSuccess
      );
      return {
        user,
        successMessages,
        eagerMessage: eagerMessages[0],
      };
    },
    { debounce: true }
  );

  constructor(
    private store: Store,
    private socket: Socket,
    private messagesApiService: MessagesApiService
  ) {
    super({});
  }

  readonly initEffect = this.effect(($) =>
    $.pipe(
      tap(() => {
        this.getMessagesEffect();
        this.listenServerGeneralMessageEffect(
          this.socket.fromEvent<MessageDto>(
            ServerSocketEvents.BroadcastGeneralMessage
          )
        );
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
        withLatestFrom(this.store.select(AuthSelectors.selectUser)),
        tap(([message, user]) => {
          if (message.sender.userId !== user.id) {
            this.store.dispatch(
              GeneralMessageActions.addServer({
                entity: { ...message, isSuccess: true },
              })
            );
          }
        })
      )
  );
}
