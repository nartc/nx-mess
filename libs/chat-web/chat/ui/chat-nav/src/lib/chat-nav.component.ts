import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nxc-chat-nav',
  template: `
    <p>
      chat-nav works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
