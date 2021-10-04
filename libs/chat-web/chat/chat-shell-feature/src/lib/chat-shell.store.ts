import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { AuthSelectors, NonNullAuthUser } from '@nx-mess/shared/store';
import { Observable } from 'rxjs';

export interface ChatShellVm {
  user: NonNullAuthUser;
}

@Injectable()
export class ChatShellStore extends ComponentStore<{}> {
  readonly user$ = this.store.select(AuthSelectors.selectUser);

  readonly vm$: Observable<ChatShellVm> = this.select(
    this.user$,
    (user) => ({ user }),
    {
      debounce: true,
    }
  );

  constructor(private store: Store) {
    super({});
  }
}
