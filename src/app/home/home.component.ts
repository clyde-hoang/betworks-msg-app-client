import { Component, OnInit } from '@angular/core';
import {ChatService} from "../services";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message: string;
  messages: string[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        console.log(`received:` + message);
        this.messages.push(message);
      });
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
}
