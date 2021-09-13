import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthModule } from '@auth0/auth0-angular';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@nx-mess/shared/environments';
import { AuthEffect, authName, authReducer } from '@nx-mess/shared/store';
import { logger } from './logger';
import { CustomRouterStateSerializer } from './router-state.serializer';

@NgModule({
  imports: [
    AuthModule.forRoot({
      domain: environment.auth.domain,
      clientId: environment.auth.clientId,
      httpInterceptor: {
        allowedList: [
          {
            uriMatcher: (uri) => uri.includes('/api'),
            allowAnonymous: true,
          },
        ],
      },
    }),
    StoreModule.forRoot(
      {
        router: routerReducer,
        [authName]: authReducer,
      },
      {
        metaReducers: environment.production ? [] : [logger],
      }
    ),
    EffectsModule.forRoot([AuthEffect]),
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
