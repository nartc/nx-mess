import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'nxc-chat-shell',
  template: `
    <ion-tabs>
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
})
export class ChatShellPage implements OnDestroy {
  constructor(private socket: Socket) {}

  ngOnDestroy() {
    this.socket.disconnect();
  }
}
