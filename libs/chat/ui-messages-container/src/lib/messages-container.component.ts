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
      <div class="flex flex-col gap-4 py-4">
        <nxc-message
          *ngFor="let message of vm.messages; trackBy: messageTracker"
          [message]="message"
          [isSelf]="message.isSelf"
        ></nxc-message>
      </div>
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

  messageTracker(_: number, message: MessageDto) {
    return message.id;
  }
}
