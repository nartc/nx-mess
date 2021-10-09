import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'nxc-chat-me',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>About me</ion-title>
      </ion-toolbar>
    </ion-header>
    <p>chat-me works!</p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMePage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
