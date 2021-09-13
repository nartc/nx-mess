import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedDataAccessModule } from '@nx-mess/shared/data-access';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([]),
    SharedDataAccessModule.forRoot(),
  ],
})
export class ChatWebShellFeatureModule {}
