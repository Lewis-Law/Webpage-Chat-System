import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = "http://localhost:3000";
  private socket;
  constructor() {
    this.socket = io(this.url);
  }
  sendMessage(message){
    this.socket.emit('add-message', message);
    console.log('sendMessage emitted ' + message);
  }
  sendImage(image) {
    this.socket.emit('add-image', image);
    console.log('sendImage emitted ' + image);
  }

  getMessages(){
    let obmessage = new Observable(


      observer =>{
      this.socket = io(this.url);
         

        this.socket.on('message', (date) => { observer.next(date); });


        return ()=>{this.socket.disconnect();}
      

      });
  return obmessage;

  }

  getImages() {
    let obmessage = new Observable(


      observer => {
        this.socket = io(this.url);


        this.socket.on('image', (date) => { observer.next(date); });


        return () => { this.socket.disconnect(); }


      });
    return obmessage;

  }
}
