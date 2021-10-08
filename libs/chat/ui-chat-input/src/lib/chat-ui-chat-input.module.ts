import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveComponentModule } from '@ngrx/component';
import { ChatInputComponent } from './chat-input.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
  ],
  declarations: [ChatInputComponent],
  exports: [ChatInputComponent],
})
export class ChatUiChatInputModule {}
