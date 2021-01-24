import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {io} from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from '../../models';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ChatService {
  private socket;

  constructor(private http: HttpClient) {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  public sendMessage(message: Message): void {
    this.socket.emit('new-message', message);
  }

  /*public getMessages (): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('new-message', (message) => {
        console.log('get messages: ' + message);
        observer.next(message);
      });
    });
  }*/

  public listenForMessages = (userId: number) => {
    // return Observable.create((observer) => {
    //     console.log(observer);
    //     this.socket.on('new-message', (message) => {
    //         observer.next(message);
    //     });
    // });
    return new Observable((observer) => {
      this.socket.on(userId.toString(), (message) => {
        observer.next(message);
        //observer.complete();
      });
    });
  }

  getConversationHistory(userId: number, fromUserId: number, limit: number) {
    return this.http.get<Message[]>(`
      ${this.constructBaseUrl()}?uid1=${userId}&uid2=${fromUserId}`);
  }

  private constructBaseUrl() {
    return `${environment.REST_URL}/${environment.REST_VERSION}/${environment.MESSAGES.BASE_SERVICE_PATH}`;
  }
}
