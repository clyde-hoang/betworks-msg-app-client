import { Action } from '@ngrx/store';
import { User, Message } from '../../../models';
import { PayloadAction } from '../../../ngrx/payload-action';

export const GET_USER_CONTACTS = '[Users] GET_USER_CONTACTS';
export const GET_USER_CONTACTS_SUCCESSFUL = '[Users] GET_USER_CONTACTS_SUCCESSFUL';
export const GET_USER_CONTACTS_ERROR = '[Users] GET_USER_CONTACTS_ERROR';

export const GET_MESSAGE_HISTORY = '[Users] GET_MESSAGE_HISTORY';
export const GET_MESSAGE_HISTORY_SUCCESSFUL = '[Users] GET_MESSAGE_HISTORY_SUCCESSFUL';
export const GET_MESSAGE_HISTORY_ERROR = '[Users] GET_MESSAGE_HISTORY_ERROR';

export const SEND_MESSAGE = '[Users] SEND_MESSAGE';
export const SEND_MESSAGE_SUCCESSFUL = '[Users] SEND_MESSAGE_SUCCESSFUL';
export const SEND_MESSAGE_ERROR = '[Users] SEND_MESSAGE_ERROR';

export class GetContactsAction extends PayloadAction<{ userId: number; }> {
  readonly type = GET_USER_CONTACTS;
}

export class GetContactsSuccessAction extends PayloadAction<User[]> {
  readonly type = GET_USER_CONTACTS_SUCCESSFUL;
}

export class GetContactsErrorAction extends PayloadAction<{ error: any }> {
  readonly type = GET_USER_CONTACTS_ERROR;
}

export class GetMessageHistoryAction extends PayloadAction<{
  userId: number;
  fromUserId: number;
}> {
  readonly type = GET_MESSAGE_HISTORY;
}

export class GetMessageHistorySuccessAction extends PayloadAction<Message[]> {
  readonly type = GET_MESSAGE_HISTORY_SUCCESSFUL;
}

export class GetMessageHistoryErrorAction extends PayloadAction<{ error: any }> {
  readonly type = GET_MESSAGE_HISTORY_ERROR;
}

export class SendMessageAction extends PayloadAction<Message> {
  readonly type = SEND_MESSAGE;
}

export class SendMessageSuccessAction extends PayloadAction<Message[]> {
  readonly type = SEND_MESSAGE_SUCCESSFUL;
}

export class SendMessageErrorAction extends PayloadAction<{ error: any }> {
  readonly type = SEND_MESSAGE_ERROR;
}

export type UsersAction =
  | GetContactsAction       | GetContactsSuccessAction        | GetContactsErrorAction
  | GetMessageHistoryAction | GetMessageHistorySuccessAction  | GetMessageHistoryErrorAction
  | SendMessageAction       | SendMessageSuccessAction        | SendMessageErrorAction;
