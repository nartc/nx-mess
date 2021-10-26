import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { AuthSelectors, NonNullAuthUser } from '@nx-mess/shared/store';
import { Observable } from 'rxjs';

export interface ChatMeVm {
  user: NonNullAuthUser;
}

@Injectable()
export class ChatMeStore extends ComponentStore<{}> {
  readonly vm$: Observable<ChatMeVm> = this.select(
    this.store.select(AuthSelectors.selectUser),
    (user) => ({ user }),
    { debounce: true }
  );

  constructor(private store: Store) {
    super({});
  }
}
