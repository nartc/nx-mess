import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersApiService } from '@nx-mess/chat/data-access-api';
import { concatMap, defer, map, mapTo, of, switchMap, take, tap } from 'rxjs';
import { AuthActions } from './auth.slice';

@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private router: Router,
    private usersApiService: UsersApiService
  ) {}

  readonly login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login.trigger),
        tap(() => {
          this.auth.loginWithRedirect({ prompt: 'consent' });
        })
      ),
    { dispatch: false }
  );

  readonly check$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.check.trigger),
      switchMap(() =>
        this.auth.user$.pipe(
          take(1),
          map((userOrNull) => AuthActions.check.success({ user: userOrNull }))
        )
      )
    )
  );

  readonly checkSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.check.success),
        concatMap(({ user }) =>
          defer(() => {
            if (!!user)
              return this.usersApiService
                .updateAuth0(user.sub as string, {
                  picture: user.picture as string,
                })
                .pipe(mapTo(user));

            return of(user);
          })
        ),
        tap((user) => {
          if (!!user) {
            void this.router.navigate(['/chat']);
          }
        })
      ),
    { dispatch: false }
  );
}
