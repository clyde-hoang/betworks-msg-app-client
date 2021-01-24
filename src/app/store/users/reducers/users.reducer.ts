import * as fromActions from '../actions/users.action';
import { User, Message } from '../../../models';

export interface UsersState {
  contacts: User[];
  messages: Message[];
  error?: any;
  loading?: boolean;
  loaded?: boolean;
}

export const defaultUsersState: UsersState = {
  contacts: [],
  messages: [],
  error: null,
  loading: false,
  loaded: false
};

export function usersReducer(state: UsersState = defaultUsersState, action: fromActions.UsersAction): UsersState {
  switch (action.type) {
    case fromActions.GET_USER_CONTACTS:
    case fromActions.GET_MESSAGE_HISTORY:
    case fromActions.SEND_MESSAGE: {
      return { ...state, loading: true, loaded: false, error: null };
    }

    case fromActions.GET_USER_CONTACTS_SUCCESSFUL: {
      const contacts = action.payload;
      return { ...state, loading: false, loaded: true, error: null, contacts: contacts };
    }

    case fromActions.GET_MESSAGE_HISTORY_SUCCESSFUL: {
      const messages = action.payload;
      return { ...state, loading: false, loaded: true, error: null, messages: messages };
    }

    case fromActions.GET_USER_CONTACTS_ERROR:
    case fromActions.GET_MESSAGE_HISTORY_ERROR:
    case fromActions.SEND_MESSAGE_ERROR: {
      return { ...state, loading: false, loaded: false, error: action.payload.error };
    }

    default:
      return state;
  }
}
