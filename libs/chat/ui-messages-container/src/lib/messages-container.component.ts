import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MessageDto } from '@nx-mess/chat/data-access-api';
import { MessagesContainerStore } from './messages-container.store';

@Component({
  selector: 'nxc-messages-container',
  template: `
    <ng-container *ngrxLet="vm$; let vm">
      <pre>{{ vm | json }}</pre>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessagesContainerStore],
})
export class MessagesContainerComponent implements OnInit {
  @Input() set messages(messages: MessageDto[]) {
    this.messagesContainerStore.setMessages(messages);
  }

  readonly vm$ = this.messagesContainerStore.vm$;

  constructor(private messagesContainerStore: MessagesContainerStore) {}

  ngOnInit(): void {}
}
