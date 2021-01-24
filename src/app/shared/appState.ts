import { AuthState, UsersState } from '../store';

export interface AppState {
  auth: AuthState;
  user: UsersState;
}
