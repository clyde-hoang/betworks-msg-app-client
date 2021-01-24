import {Component, OnInit, OnDestroy} from '@angular/core';
import {ChatService} from "../services";
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {AppState} from '../shared/appState';
import * as fromStore from '../store';
import {User, Message} from "../models";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: any = {
    id: 1
  }
  messagesList: Message[] = [];
  contactsList: User[] = [];
  currentContact: User;

  newMessage: string;
  unsubscribe$: Subject<void> = new Subject();

  constructor(
    private store: Store<AppState>,
    private chatService: ChatService) {
    this.store.dispatch(new fromStore.GetContactsAction({userId: this.currentUser.id}));
    this.store.pipe(select(fromStore.getUsersContacts, takeUntil(this.unsubscribe$))).subscribe((contacts: User[]) => {
      this.contactsList = contacts;
      if (contacts && contacts.length > 0) {
        this.currentContact = contacts[0];
        this.store.dispatch(new fromStore.GetMessageHistoryAction(
          {userId: this.currentUser.id, fromUserId: this.currentContact.id}
        ));

        this.chatService
          .listenForMessages(this.currentContact.id)
          .subscribe((message: Message) => {
            // clone object to omit object descriptors
            this.messagesList.push(<Message>{
              id: message.id,
              timestamp: message.timestamp,
              from: message.from,
              to: message.to,
              text: message.text
            });
          });
      }
    });

    this.store.pipe(select(fromStore.getUsersMessages, takeUntil(this.unsubscribe$))).subscribe((messages: Message[]) => {
      this.messagesList = messages;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  sendMessage() {
    const newMsg = <Message>{
      timestamp: new Date(),
      from: this.currentUser.id,
      to: this.currentContact.id,
      text: this.newMessage
    };
    this.chatService.sendMessage(newMsg);
    this.newMessage = '';
  }

  selectContact(contact: User) {
    this.currentContact = contact;
    this.store.dispatch(new fromStore.GetMessageHistoryAction({userId: 1, fromUserId: this.currentContact.id}));
  }
}
