import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatMePage } from './chat-me.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ChatMePage }]),
  ],
  declarations: [ChatMePage],
})
export class ChatFeatureChatMeModule {}
