import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { configureTestSuite } from 'ng-bullet';
import { Actions } from '@ngrx/effects';
import { of } from 'rxjs';

import { getActions, TestActions } from '../../../../test-utils/test-actions';
import { AuthService } from '../../../services';
import { AuthEffects } from './auth.effect';
import * as fromActions from '../actions';
import { allUsersList } from '../../../interfaces/user/users.dto.spec';
import * as fromAuthorization from '../../../home/authorization/store';
import * as fromClientDefaults from '../../client-defaults';


describe('AuthEffects', () => {
  let actions$: TestActions;
  let service: AuthService;
  let effects: AuthEffects;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        AuthEffects,
        AuthService,
        { provide: 'Window', useValue: window },
        { provide: Actions, useFactory: getActions }
      ]
    });
  });

  beforeEach(() => {
    actions$ = (TestBed.inject(Actions) as TestActions);
    service  = TestBed.inject(AuthService);
    effects  = TestBed.inject(AuthEffects);

    spyOn(service, 'login').and.returnValue(of(new HttpResponse({ body: { user: {...allUsersList[0]}}, status: 200 })));
    spyOn(service, 'twoFALogin').and.returnValue(of(new HttpResponse({ body: { user: {...allUsersList[0]}}, status: 200 })));
    spyOn(service, 'resendAuthenticationCode').and.returnValue(of(null));
  });

  describe('login$', () => {
    it('should work', () => {
      const action     = new fromActions.LoginAction({ email: 'email', password: 'password' });
      const values = {
        b: new fromActions.LoginSuccessfulAction({ token: null }),
        c: new fromActions.UpdateAuthenticatedUser({ ...allUsersList[0] }),
        d: new fromAuthorization.LoadUserPermissions({ ...allUsersList[0] }),
        e: new fromClientDefaults.LoadClientFieldsSetDefaults(),
      };

      actions$.stream = hot('-a', { a: action });
      const expected  = cold('-(bcde)', values);

      expect(effects.login$).toBeObservable(expected);
    });
  });

  describe('twoFALogin$', () => {
    it('should work', () => {
      const action     = new fromActions.TwoFALogin({ email: 'email', password: 'password', authenticationCode: '12345' });
      const values = {
        b: new fromActions.LoginSuccessfulAction({ token: null }),
        c: new fromActions.UpdateAuthenticatedUser({ ...allUsersList[0] }),
        d: new fromAuthorization.LoadUserPermissions({ ...allUsersList[0] }),
        e: new fromClientDefaults.LoadClientFieldsSetDefaults(),
      };

      actions$.stream = hot('-a', { a: action });
      const expected  = cold('-(bcde)', values);

      expect(effects.twoFALogin$).toBeObservable(expected);
    });
  });

  describe('resendAuthenticationCode$', () => {
    it('should work', () => {
      const action     = new fromActions.ResendAuthenticationCode('email');
      const completion = new fromActions.ResendAuthenticationCodeSuccess();

      actions$.stream = hot('-a', { a: action });
      const expected  = cold('-b', { b: completion });

      expect(effects.resendAuthenticationCode$).toBeObservable(expected);
    });
  });
});
