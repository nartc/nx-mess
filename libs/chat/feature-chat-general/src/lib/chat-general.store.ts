import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { GeneralMessageSelectors } from '@nx-mess/chat/data-access-chat-general';
import { MessageDto } from '@nx-mess/shared/data-access-api';
import { AuthSelectors, NonNullAuthUser } from '@nx-mess/shared/store';
import { Observable } from 'rxjs';

export interface ChatGeneralVm {
  user: NonNullAuthUser;
  messages: MessageDto[];
}

@Injectable()
export class ChatGeneralStore extends ComponentStore<{}> {
  readonly user$ = this.store.select(AuthSelectors.selectUser);
  readonly generalMessages$ = this.store.select(
    GeneralMessageSelectors.selectAll
  );

  readonly vm$: Observable<ChatGeneralVm> = this.select(
    this.user$,
    this.generalMessages$,
    (user, messages) => ({ user, messages }),
    { debounce: true }
  );

  constructor(private store: Store) {
    super({});
  }
}
