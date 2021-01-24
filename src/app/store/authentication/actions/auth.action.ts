import { Action } from '@ngrx/store';
import { User } from '../../../models';
import { PayloadAction } from '../../../ngrx/payload-action';

export const LOGIN = '[Auth] LOGIN';
export const LOGIN_SUCCESSFUL = '[Auth] LOGIN_SUCCESSFUL';
export const LOGIN_ERROR = '[Auth] LOGIN_ERROR';

export const LOGOUT = '[Auth] LOGOUT';
export const LOGOUT_SUCCESSFUL = '[Auth] LOGOUT_SUCCESSFUL';

export const UPDATE_AUTHENTICATED_USER = '[Auth] UPDATE_AUTHENTICATED_USER';
export const UPDATE_AUTH_TOKEN = '[Auth] UPDATE_AUTH_TOKEN';


export class LoginAction extends PayloadAction<{
  username: string;
  password: string;
}> {
  readonly type = LOGIN;
}
export class LoginSuccessfulAction extends PayloadAction<{ token: string }> {
  readonly type = LOGIN_SUCCESSFUL;
}
export class LoginErrorAction extends PayloadAction<{ error: any }> {
  readonly type = LOGIN_ERROR;
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;
}
export class LogoutSuccessAction implements Action {
  readonly type = LOGOUT_SUCCESSFUL;
}

export class UpdateAuthenticatedUser extends PayloadAction<User> {
  readonly type = UPDATE_AUTHENTICATED_USER;
}

export class UpdateAuthToken extends PayloadAction<string> {
  readonly type = UPDATE_AUTH_TOKEN;
}

export type AuthAction =
  | LoginAction                | LoginSuccessfulAction             | LoginErrorAction
  | LogoutAction               | LogoutSuccessAction
  | UpdateAuthenticatedUser
  | UpdateAuthToken;
