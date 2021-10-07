import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GeneralMessageEffect } from './general-message.effect';
import { GeneralMessageFeature } from './general-message.slice';

@NgModule({
  imports: [
    StoreModule.forFeature(GeneralMessageFeature),
    EffectsModule.forFeature([GeneralMessageEffect]),
  ],
})
export class ChatDataAccessChatGeneralModule {}
