import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import { User } from '../../../models';
import { AuthenticationService } from '../../../services';
import * as fromActions from '../actions/auth.action';
import {LOGOUT, LogoutSuccessAction} from '../actions/auth.action';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              private router: Router,
              private authenticationService: AuthenticationService
  ) {}

  @Effect()
  login$ = this.actions$.pipe(
    ofType(fromActions.LOGIN),
    map((action: fromActions.LoginAction) => action.payload),
    switchMap(({ username, password }) =>
      this.authenticationService.login(username, password).pipe(
        map((user: User) => {
            return user;
        }),
        switchMap(this.loginSuccessHandler.bind(this)),
        catchError(err => {
          return of(new fromActions.LoginErrorAction({ error: err }));
        })
      )
    )
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(fromActions.LOGOUT),
    switchMap(this.logoutHandler.bind(this)),
    tap(() => this.router.navigate(['/login']))
  );

  private loginSuccessHandler(user: User) {
    return [
      new fromActions.LoginSuccessfulAction({ token: user.token }),
      new fromActions.UpdateAuthenticatedUser(user)
    ];
  }

  private logoutHandler() {
    return [
      new fromActions.LogoutSuccessAction()
    ];
  }
}
