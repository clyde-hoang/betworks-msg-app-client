import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from '../reducers/users.reducer';

export const getUsersState = createFeatureSelector<fromReducer.UsersState>('user');
export const getUsersLoading = createSelector(getUsersState, (state: fromReducer.UsersState) => state.loading);
export const getUsersLoaded = createSelector(getUsersState, (state: fromReducer.UsersState) => state.loaded);
export const getUsersError = createSelector(getUsersState, (state: fromReducer.UsersState) => state.error);
export const getUsersContacts = createSelector(getUsersState, (state: fromReducer.UsersState) => state.contacts);
export const getUsersMessages = createSelector(getUsersState, (state: fromReducer.UsersState) => state.messages);
