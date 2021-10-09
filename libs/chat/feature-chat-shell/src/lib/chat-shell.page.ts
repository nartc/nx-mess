import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChatShellStore } from './chat-shell.store';

@Component({
  selector: 'nxc-chat-shell',
  template: `
    <ion-tabs (ionTabsDidChange)="onIonTabsDidChanged($event)">
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="general">
          <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
          <ion-label>General</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="friends">
          <ion-icon name="people-outline"></ion-icon>
          <ion-label>Friends</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="me">
          <ion-icon name="person-outline"></ion-icon>
          <ion-label>Me</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatShellStore],
})
export class ChatShellPage implements OnInit {
  constructor(private chatShellStore: ChatShellStore) {}

  ngOnInit() {
    this.chatShellStore.initEffect();
  }

  onIonTabsDidChanged({ tab }: { tab: string }) {
    this.chatShellStore.setSelectedTab(tab);
  }
}
