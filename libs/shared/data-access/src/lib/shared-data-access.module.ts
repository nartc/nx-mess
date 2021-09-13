import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@nx-mess/shared/environments';
import { logger } from './logger';
import { CustomRouterStateSerializer } from './router-state.serializer';

@NgModule({
  imports: [
    StoreModule.forRoot(
      {
        router: routerReducer,
      },
      {
        metaReducers: environment.production ? [] : [logger],
      }
    ),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      name: 'Nx Messenger',
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomRouterStateSerializer,
    }),
  ],
})
export class SharedDataAccessModule {
  static forRoot(): ModuleWithProviders<SharedDataAccessModule> {
    return {
      ngModule: SharedDataAccessModule,
    };
  }
}
