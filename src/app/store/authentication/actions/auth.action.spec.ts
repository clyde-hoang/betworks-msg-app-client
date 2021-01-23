import * as fromActions from './auth.action';

describe('Auth Action Test', () => {
  const error = { message: 'Test Error' };

  describe('LoginAction', () => {
    it('should work', () => {
      const expectedResult = { username: 'email', password: 'password' };
      const action = new fromActions.LoginAction({...expectedResult});

      expect({ ...action }).toEqual({
        type: fromActions.LOGIN,
        payload: expectedResult
      });
    });
  });
  describe('LoginSuccessfulAction', () => {
    it('should work', () => {
      const action = new fromActions.LoginSuccessfulAction({ token: 'TOKEN' });

      expect({ ...action }).toEqual({
        type: fromActions.LOGIN_SUCCESSFUL,
        payload: { token: 'TOKEN' }
      });
    });
  });
  describe('LoginErrorAction', () => {
    it('should work', () => {
      const action = new fromActions.LoginErrorAction({ error });

      expect({ ...action }).toEqual({
        type: fromActions.LOGIN_ERROR,
        payload: { error },
      });
    });
  });
});
