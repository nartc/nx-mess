import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nxc-chat-menu',
  template: `
    <p>
      chat-menu works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
