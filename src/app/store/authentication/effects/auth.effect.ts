import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from '../../../models';
import { AuthenticationService } from '../../../services';
import * as fromActions from '../actions/auth.action';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthEffects {
  // Listen for the 'LOGIN' action
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

  private loginSuccessHandler(user: User) {
    sessionStorage.setItem(environment.AUTH.USERID_NAME, `${user.id}`);

    return [
      new fromActions.LoginSuccessfulAction({ token: user.token }),
      new fromActions.UpdateAuthenticatedUser(user)
    ];
  }

  constructor(private actions$: Actions,
              private router: Router,
              private authenticationService: AuthenticationService
  ) {
    this.actions$
      .pipe(ofType(fromActions.LOGIN_ERROR, fromActions.LOGOUT_SUCCESSFUL))
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
