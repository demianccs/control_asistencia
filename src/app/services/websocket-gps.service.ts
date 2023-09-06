import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketGpsService {
  socket: any;

  constructor() {
    this.socket = io('ws://localhost:3000');
  }

  emitLocation(location: any) {
    this.socket.emit('location', location);
  }

  onNewLocation() {
    return new Observable(observer => {
      this.socket.on('new-location', (location: any) => {
        observer.next(location);
      });
    });
  }
}




