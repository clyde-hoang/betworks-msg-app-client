import {Component, OnInit, OnDestroy} from '@angular/core';
import {ChatService} from '../services';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {AppState} from '../shared/appState';
import * as fromStore from '../store';
import {User, Message} from '../models';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.scss']
})
export class ChatInboxComponent implements OnInit, OnDestroy {
  currentUser: User;
  messagesList: Message[] = [];
  contactsList: User[] = [];
  currentContact: User;

  newMessage: string;
  unsubscribe$: Subject<void> = new Subject();

  constructor(
    private store: Store<AppState>,
    private chatService: ChatService) {

    this.store.pipe(select(fromStore.getAuthUser), takeUntil(this.unsubscribe$)).subscribe((user: User) => {
      this.currentUser = user;
      if (this.currentUser) {
        this.store.dispatch(new fromStore.GetContactsAction({userId: this.currentUser.id}));

        // listen of messages
        this.chatService
          .listenForMessages(this.currentUser.id).pipe(takeUntil(this.unsubscribe$))
          .subscribe((message: Message) => {
            // add message to chat if the current contact is engaged
            if (message.from == this.currentContact.id) {
              this.messagesList.push({
                id: message.id,
                timestamp: message.timestamp,
                from: message.from,
                to: message.to,
                text: message.text
              } as Message);
            }
          });
      }
    });
  }

  ngOnInit() {
    // retrieve user contacts
    this.store.pipe(select(fromStore.getUsersContacts, takeUntil(this.unsubscribe$))).subscribe((contacts: User[]) => {
      this.contactsList = contacts;
      if (contacts && contacts.length > 0) {
        this.currentContact = contacts[0];
        this.store.dispatch(new fromStore.GetMessageHistoryAction(
          {userId: this.currentUser.id, fromUserId: this.currentContact.id}
        ));
      }
    });

    this.store.pipe(select(fromStore.getUsersMessages, takeUntil(this.unsubscribe$))).subscribe((messages: Message[]) => {
      this.messagesList = [...messages]; // clone array so we can modify it without going through ngrx
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  sendMessage() {
    const newMsg = {
      timestamp: new Date(),
      from: this.currentUser.id,
      to: this.currentContact.id,
      text: this.newMessage
    } as Message;
    this.messagesList.push(newMsg);
    this.chatService.sendMessage(newMsg);
    this.newMessage = '';
  }

  selectContact(contact: User) {
    this.currentContact = contact;
    this.store.dispatch(new fromStore.GetMessageHistoryAction(
      {userId: this.currentUser.id, fromUserId: this.currentContact.id}));
  }
}
