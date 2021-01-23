import * as fromActions from '../actions/auth.action';
import { User } from '../../../models';
import { environment } from '../../../../environments/environment';

export interface AuthState {
  isLoggedIn: boolean;
  token: string;
  error?: any;
  loading?: boolean;
  loaded?: boolean;
  authenticatedUser: User;
}

export const defaultAuthState: AuthState = {
  isLoggedIn: false,
  token: null,
  error: null,
  loading: false,
  loaded: false,
  authenticatedUser: null
};

export function authReducer(state: AuthState = defaultAuthState, action: fromActions.AuthAction): AuthState {
  switch (action.type) {
    case fromActions.LOGIN: {
      return { ...defaultAuthState, loading: true, loaded: false, error: null, authenticatedUser: null };
    }

    case fromActions.LOGIN_SUCCESSFUL: {
      return { ...state, isLoggedIn: true, token: action.payload.token, loading: false, loaded: true, error: null };
    }

    case fromActions.LOGIN_ERROR: {
      return { ...state, isLoggedIn: false, token: null, error: action.payload.error, loading: false, loaded: false };
    }

    case fromActions.LOGOUT_SUCCESSFUL: {
      sessionStorage.removeItem(environment.AUTH.TOKEN_HEADER_NAME);
      sessionStorage.removeItem(environment.AUTH.USERID_NAME);
      return { ...defaultAuthState };
    }

    case fromActions.UPDATE_AUTHENTICATED_USER: {
      return { ...state, authenticatedUser: action.payload };
    }

    case fromActions.UPDATE_AUTH_TOKEN: {
      const token = action.payload;
      return { ...state, token };
    }

    default:
      return state;
  }
}
