import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounce, of, timer } from 'rxjs';
import { ChatInputStore } from './chat-input.store';

@Component({
  selector: 'nxc-chat-input',
  template: `
    <ng-container *ngrxLet="vm$; let vm">
      <ion-textarea
        class="p-2 rounded border bg-white"
        placeholder="Say something..."
        [formControl]="messageControl"
        (keyup.shift.enter)="onShiftEnter()"
      ></ion-textarea>
      <ion-button (click)="onSendClick()" [disabled]="vm.isSendDisabled">
        <ion-icon slot="icon-only" name="send-outline"></ion-icon>
      </ion-button>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatInputStore],
})
export class ChatInputComponent implements OnInit {
  @Output() typingChange = this.chatInputStore.status$;
  @Output() message = this.chatInputStore.chatOutput$;

  @HostBinding('class') hostClass = 'p-4 flex items-center gap-4 bg-gray-200';

  readonly vm$ = this.chatInputStore.vm$;

  messageControl = new FormControl('', [Validators.required]);

  constructor(private chatInputStore: ChatInputStore) {}

  ngOnInit(): void {
    this.chatInputStore.initEffect();
    this.chatInputStore.setMessage(
      this.messageControl.valueChanges.pipe(
        debounce((value) => (value ? timer(250) : of(null)))
      )
    );
  }

  onSendClick() {
    this.chatInputStore.sendMessage();
    this.messageControl.reset('');
  }

  onShiftEnter() {
    this.onSendClick();
  }
}
