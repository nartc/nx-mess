import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MessageDto } from '@nx-mess/chat/data-access-api';

@Component({
  selector: 'nxc-message[message]',
  template: `
    <div class="clearfix flex flex-col" [class.items-end]="!isSelf">
      <span *ngIf="message.sender" class="mx-4 text-sm">
        {{
          message.sender.nickname || message.sender.name || message.sender.email
        }}
      </span>
      <div
        class="w-full md:w-3/4 mx-4 p-2 rounded-lg"
        [class.opacity-50]="isEager"
        [class]="isSelf ? ['bg-gray-300'] : ['bg-green-400', 'float-right']"
      >
        {{ message.text }}
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  @Input() message!: MessageDto;
  @Input() isSelf = false;
  @Input() isEager = false;
}
