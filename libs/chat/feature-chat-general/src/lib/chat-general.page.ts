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
      <ion-content>
        <ng-container *ngIf="vm.successMessages.length; else noMessage">
          <nxc-messages-container
            [messages]="vm.successMessages"
          ></nxc-messages-container>
          <nxc-message
            class="my-4"
            *ngIf="vm.eagerMessage"
            [message]="vm.eagerMessage"
            [isSelf]="true"
            [isEager]="true"
          ></nxc-message>
        </ng-container>
        <ng-template #noMessage>
          <ion-text>No messages. Say something</ion-text>
        </ng-template>
      </ion-content>

      <ion-footer>
        <span class="mx-4">{{ vm.whoIsTyping | whoIsTyping }}</span>
        <nxc-chat-input
          (typingChange)="onTypingChanged($event)"
          (message)="onMessage($event)"
        ></nxc-chat-input>
      </ion-footer>
    </ng-container>
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
    this.chatGeneralStore.setTypingEffect(status === 'typing');
  }
}
