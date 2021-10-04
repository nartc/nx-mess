import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';
import { ChatComponent } from './chat.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ChatComponent }]),
    ReactiveComponentModule,
  ],
  declarations: [ChatComponent],
})
export class ChatWebChatChatFeatureModule {}
