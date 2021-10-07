import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthModule } from '@auth0/auth0-angular';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ApiModule, Configuration } from '@nx-mess/shared/data-access-api';
import { environment } from '@nx-mess/shared/environments';
import {
  AuthEffect,
  authName,
  authReducer,
  CustomRouterStateSerializer,
  routerFeatureKey,
  SocketEffect,
} from '@nx-mess/shared/store';
import { SocketIoModule } from 'ngx-socket-io';
import { logger } from './logger';

export function apiConfigurationFactory() {
  return new Configuration({ basePath: '' });
}

@NgModule({
  imports: [
    HttpClientModule,
    ApiModule.forRoot(apiConfigurationFactory),
    AuthModule.forRoot({
      domain: environment.auth.domain,
      clientId: environment.auth.clientId,
      useRefreshTokens: true,
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
        [routerFeatureKey]: routerReducer,
        [authName]: authReducer,
      },
      {
        metaReducers: environment.production ? [] : [logger],
      }
    ),
    EffectsModule.forRoot([AuthEffect, SocketEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      name: 'Nx Messenger',
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomRouterStateSerializer,
    }),
    SocketIoModule.forRoot({ url: '', options: { autoConnect: false } }),
  ],
})
export class SharedDataAccessModule {
  static forRoot(): ModuleWithProviders<SharedDataAccessModule> {
    return {
      ngModule: SharedDataAccessModule,
    };
  }
}
