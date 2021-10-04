import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChatMenuComponent } from './chat-menu.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ChatMenuComponent],
  exports: [ChatMenuComponent],
})
export class ChatWebChatUiChatMenuModule {}
