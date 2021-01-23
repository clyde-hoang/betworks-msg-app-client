import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from '../reducers/auth.reducer';
import { environment } from '../../../../environments/environment';

export const getAuthState = createFeatureSelector<fromReducer.AuthState>('auth');
export const getAuthLoading = createSelector(getAuthState, (state: fromReducer.AuthState) => state.loading);
export const getAuthLoaded = createSelector(getAuthState, (state: fromReducer.AuthState) => state.loaded);
export const getAuthError = createSelector(getAuthState, (state: fromReducer.AuthState) => state.error);
export const getAuthIsLoggedIn = createSelector(getAuthState, (state: fromReducer.AuthState) => state.isLoggedIn);
export const getAuthUser = createSelector(getAuthState, (state: fromReducer.AuthState) => state.authenticatedUser);
export const getAuthToken = createSelector(
  getAuthState,
  (state: fromReducer.AuthState) => state.token || sessionStorage.getItem(environment.AUTH.TOKEN_HEADER_NAME)
);
