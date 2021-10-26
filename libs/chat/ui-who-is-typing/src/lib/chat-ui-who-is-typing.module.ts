import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhoIsTypingPipe } from './who-is-typing.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    WhoIsTypingPipe
  ],
  exports: [
    WhoIsTypingPipe
  ],
})
export class ChatUiWhoIsTypingModule {}
