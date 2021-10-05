import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SharedDataAccessModule } from '@nx-mess/shared/data-access';
import { routes } from './chat.routes';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule.forRoot(routes),
    SharedDataAccessModule.forRoot(),
  ],
  exports: [RouterModule, IonicModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
})
export class ChatFeatureShellModule {}
