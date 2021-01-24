import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User, Message } from '../../../models';
import { UserService, ChatService } from '../../../services';
import * as fromActions from '../actions/users.action';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions,
              private router: Router,
              private userService: UserService,
              private chatService: ChatService) {}

  @Effect()
  loadContacts$ = this.actions$.pipe(
    ofType(fromActions.GET_USER_CONTACTS),
    map((action: fromActions.GetMessageHistoryAction) => action.payload),
    switchMap(({ userId, fromUserId }) =>
      this.userService.getContacts(userId).pipe(
        map((result: User[]) => new fromActions.GetContactsSuccessAction(result)),
        catchError(error => of(new fromActions.GetContactsErrorAction(error)))
      )
    )
  );

  @Effect()
  loadMessageHistory$ = this.actions$.pipe(
    ofType(fromActions.GET_MESSAGE_HISTORY),
    map((action: fromActions.GetMessageHistoryAction) => action.payload),
    switchMap(({ userId, fromUserId }) =>
      this.chatService.getConversationHistory(userId, fromUserId, 100).pipe(
        map((result: Message[]) => new fromActions.GetMessageHistorySuccessAction(result)),
        catchError(error => of(new fromActions.GetMessageHistoryErrorAction(error)))
      )
    )
  );
}
