import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChatStore } from './chat.store';

@Component({
  selector: 'nxc-chat',
  template: `
    <ng-container *ngrxLet="vm$; let vm">
      <pre>{{ vm | json }}</pre>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatStore],
})
export class ChatComponent implements OnInit {
  readonly vm$ = this.chatStore.vm$;

  constructor(private chatStore: ChatStore) {}

  ngOnInit(): void {}
}
