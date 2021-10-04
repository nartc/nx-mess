import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'nxc-chat-menu-nav',
  template: `
    <div class="flex items-center gap-4">
      <h6>Nx Mess</h6>
      <svg-icon key="search"></svg-icon>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMenuNavComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
