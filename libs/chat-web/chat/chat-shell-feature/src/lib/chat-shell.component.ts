import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChatShellStore } from './chat-shell.store';

@Component({
  selector: 'nxc-chat',
  template: `
    <ng-container *ngrxLet="vm$; let vm">
      <div class="grid grid-cols-4 grid-rows-7 w-screen h-screen">
        <nxc-chat-menu-nav></nxc-chat-menu-nav>
        <nxc-chat-nav class="col-span-3 row-span-1"></nxc-chat-nav>
        <nxc-chat-menu class="col-span-1 row-span-6"></nxc-chat-menu>
        <div class="row-span-6 col-span-3">
          <router-outlet></router-outlet>
        </div>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatShellStore],
})
export class ChatShellComponent implements OnInit {
  readonly vm$ = this.chatStore.vm$;

  constructor(private chatStore: ChatShellStore) {}

  ngOnInit(): void {}
}
