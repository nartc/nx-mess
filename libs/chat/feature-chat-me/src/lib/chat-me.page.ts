import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatMeStore } from './chat-me.store';

@Component({
  selector: 'nxc-chat-me',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>About me</ion-title>
      </ion-toolbar>
    </ion-header>

    <ng-container *ngrxLet="vm$; let vm">
      <ion-content>
        <pre>{{ vm.user | json }}</pre>
      </ion-content>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatMeStore],
})
export class ChatMePage {
  readonly vm$ = this.chatMeStore.vm$;

  constructor(private chatMeStore: ChatMeStore) {}
}
