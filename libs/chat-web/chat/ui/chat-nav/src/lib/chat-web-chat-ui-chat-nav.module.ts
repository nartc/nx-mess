import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatNavComponent } from './chat-nav.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ChatNavComponent
  ],
  exports: [
    ChatNavComponent
  ],
})
export class ChatWebChatUiChatNavModule {}
