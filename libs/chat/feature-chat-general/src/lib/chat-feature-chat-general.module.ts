import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';
import { ChatGeneralPage } from './chat-general.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ChatGeneralPage }]),
    ReactiveComponentModule,
  ],
  declarations: [ChatGeneralPage],
})
export class ChatFeatureChatGeneralModule {}
