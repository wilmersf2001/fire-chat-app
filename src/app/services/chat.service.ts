import { Injectable } from '@angular/core';
import { Database, ref, onValue, push } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { IMensaje } from '../interfaces/mensaje';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private fireBaseChatRef = ref(this.database, 'chats');
  private userAuth: any;

  constructor(private database: Database, private authService: AuthService) {
    this.userAuth = this.authService.userAuth();
  }

  getMessage(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      onValue(this.fireBaseChatRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const messagesArray = Object.keys(data).map((key) => ({
            uid: key,
            ...data[key],
          }));
          observer.next(messagesArray);
        } else {
          observer.next([]);
        }
      });
    });
  }

  sendMessage(mensaje: IMensaje) {
    return push(this.fireBaseChatRef, {
      uid: this.userAuth.user.uid,
      message: mensaje.message,
      autor: this.userAuth.user.displayName,
      timestamp: new Date().toISOString(),
    });
  }
}
