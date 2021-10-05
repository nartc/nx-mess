import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nxc-chat-me',
  template: `
    <p>chat-me works!</p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMePage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
