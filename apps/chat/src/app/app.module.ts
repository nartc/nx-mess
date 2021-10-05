import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatFeatureShellModule } from '@nx-mess/chat/feature-shell';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, ChatFeatureShellModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
