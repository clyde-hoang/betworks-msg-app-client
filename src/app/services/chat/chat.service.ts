import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {io} from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()
export class ChatService {
  private socket;

  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  public sendMessage(message): void {
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

  public getMessages = () => {
    // return Observable.create((observer) => {
    //     console.log(observer);
    //     this.socket.on('new-message', (message) => {
    //         observer.next(message);
    //     });
    // });
    return new Observable((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
        //observer.complete();
      });
    });
  }
}
