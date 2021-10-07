import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChatGeneralStore } from './chat-general.store';

@Component({
  selector: 'nxc-chat-general',
  template: `
    <ng-container *ngrxLet="vm$; let vm">
      <pre>{{ vm | json }}</pre>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatGeneralStore],
})
export class ChatGeneralPage implements OnInit {
  readonly vm$ = this.chatGeneralStore.vm$;

  constructor(private chatGeneralStore: ChatGeneralStore) {}

  ngOnInit() {
    this.chatGeneralStore.initEffect();
  }
}
