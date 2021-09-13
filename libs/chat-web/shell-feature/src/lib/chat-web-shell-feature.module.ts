import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedDataAccessModule } from '@nx-mess/shared/data-access';
import { chatWebRoutes } from './routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(chatWebRoutes),
    SharedDataAccessModule.forRoot(),
  ],
  exports: [RouterModule],
})
export class ChatWebShellFeatureModule {}
