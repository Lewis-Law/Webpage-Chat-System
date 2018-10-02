import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket/socket.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username: string;
  messages = [];
  message;
  connection;
  messagesArr = [];
  image;
  imageArr = [];
  constructor(private sockServ: SocketService, private router: Router, private httpClient: HttpClient) { }
  private apiURL = 'http://localhost:3000/api/';
  userArr = [];
  ngOnInit() {
    if (!sessionStorage.getItem('username')) {
      console.log('Not validated');
      sessionStorage.clear();
      alert("User not logged in");
      this.router.navigateByUrl('login');
    } else {
      this.username = sessionStorage.getItem('username');
      this.httpClient.get(this.apiURL + 'user/read')
        .subscribe((data: any) => {
          for (var i = 0; i < data.length; i++) {
            if (data[i].username == this.username) {
              this.userArr = data[i]
              console.log(this.userArr);
            }
          }
        });
      console.log("Session started for: " + this.username);
      this.connection = this.sockServ.getMessages().subscribe(message => {
        this.connection = this.sockServ.getImages().subscribe(image => {
          console.log(message);
          this.messages.push({ message: message, image: image });
          console.log(this.messages);
          this.message = '';
          this.image = '';
        });
        
      });

    }
  }



  sendMessage() {
    this.sockServ.sendMessage(this.username + ' says: ' + this.message);
    this.sockServ.sendImage(this.userArr);
  }

  ngOnDestroy() {
    if (this.connection) {
      this.connection.unsubscribe();
    }
  }

}
