import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nxc-chat-friends',
  template: `
    <p>chat-friends works!</p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatFriendsPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
