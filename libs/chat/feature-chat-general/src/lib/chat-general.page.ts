import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChatGeneralStore } from './chat-general.store';

@Component({
  selector: 'nxc-chat-general',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>General</ion-title>
      </ion-toolbar>
    </ion-header>

    <ng-container *ngrxLet="vm$; let vm">
      <nxc-messages-container
        [messages]="vm.successMessages"
      ></nxc-messages-container>
      <pre>{{ vm.eagerMessage | json }}</pre>
    </ng-container>

    <ion-footer>
      <nxc-chat-input
        (typingChange)="onTypingChanged($event)"
        (message)="onMessage($event)"
      ></nxc-chat-input>
    </ion-footer>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatGeneralStore],
})
export class ChatGeneralPage implements OnInit {
  readonly vm$ = this.chatGeneralStore.vm$;

  constructor(private chatGeneralStore: ChatGeneralStore) {}

  ngOnInit() {
    this.chatGeneralStore.initEffect();
  }

  onMessage(message: string) {
    this.chatGeneralStore.sendMessageEffect(message);
  }

  onTypingChanged(status: 'typing' | 'idle') {
    console.log({ status });
  }
}
