import * as fromActions from '../actions';
import * as fromReducer from './auth.reducer';


describe('Auth Reducer Test', () => {
  let defaultAuthState;
  const error = { message: 'Test Message' };

  beforeEach(() => {
    defaultAuthState = { ...fromReducer.defaultAuthState };
  });

  describe('testing undefined action', () => {
    it('should return the default state', () => {
      const action: any = {};
      const state = fromReducer.authReducer(undefined, action);

      expect(state).toEqual(defaultAuthState);
    });
  });

  describe('LOGIN', () => {
    it('should set the correct states', () => {
      const action: any = new fromActions.LoginAction({ email: 'email', password: 'password' });
      const state = fromReducer.authReducer(defaultAuthState, action);

      expect(state.loading).toEqual(true);
      expect(state.loaded).toEqual(false);
      expect(state.error).toEqual(null);
    });
  });
  describe('LOGIN_SUCCESSFUL', () => {
    it('should set the correct states', () => {
      const action: any = new fromActions.LoginSuccessfulAction({ token: 'TOKEN' });
      const state = fromReducer.authReducer(defaultAuthState, action);

      expect(state.loading).toEqual(false);
      expect(state.loaded).toEqual(true);
      expect(state.token).toEqual('TOKEN');
      expect(state.isLoggedIn).toEqual(true);
    });
  });
  describe('LOGIN_ERROR', () => {
    it('should set the correct states', () => {
      const action: any = new fromActions.LoginErrorAction({ error });
      const state = fromReducer.authReducer(defaultAuthState, action);

      expect(state.loading).toEqual(false);
      expect(state.loaded).toEqual(false);
      expect(state.error).toEqual(error as any);
    });
  });

  describe('TWO_FA_LOGIN', () => {
    it('should set the correct states', () => {
      const action: any = new fromActions.TwoFALogin({ email: 'email', password: 'password', authenticationCode: '12345' });
      const state = fromReducer.authReducer(defaultAuthState, action);

      expect(state.loading).toEqual(true);
      expect(state.loaded).toEqual(false);
      expect(state.error).toEqual(null);
    });
  });
  describe('TWO_FA_LOGIN_FAIL', () => {
    it('should set the correct states', () => {
      const action: any = new fromActions.TwoFALoginFail({ error });
      const state = fromReducer.authReducer(defaultAuthState, action);

      expect(state.loading).toEqual(false);
      expect(state.loaded).toEqual(false);
      expect(state.error).toEqual(error as any);
    });
  });

  describe('RESEND_AUTHENTICATION_CODE', () => {
    it('should set the correct states', () => {
      const action: any = new fromActions.ResendAuthenticationCode('email');
      const state = fromReducer.authReducer(defaultAuthState, action);

      expect(state.loading).toEqual(true);
      expect(state.loaded).toEqual(false);
      expect(state.error).toEqual(null);
    });
  });
  describe('RESEND_AUTHENTICATION_CODE_SUCCESS', () => {
    it('should set the correct states', () => {
      const action: any = new fromActions.LoginSuccessfulAction({ token: 'TOKEN' });
      const state = fromReducer.authReducer(defaultAuthState, action);

      expect(state.loading).toEqual(false);
      expect(state.error).toEqual(null);
    });
  });
  describe('RESEND_AUTHENTICATION_CODE_FAIL', () => {
    it('should set the correct states', () => {
      const action: any = new fromActions.ResendAuthenticationCodeFail({ error });
      const state = fromReducer.authReducer(defaultAuthState, action);

      expect(state.loading).toEqual(false);
      expect(state.loaded).toEqual(false);
      expect(state.error).toEqual(error as any);
    });
  });
});
