import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList
} from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  event: AngularFireList<any>;
  items: Observable<{ events: any }>;

  constructor(private db: AngularFireDatabase) {
    this.items = this.db.object<{ events: any }>('events').valueChanges();
  }

  async pushEvent(data: any) {
    try {
      console.log('service', data);
      const newItem = {
        start: data.start,
        end: data.end,
        title: data.title,
        email: data.email,
        id: data.id,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
      };
      const dat = await this.db.list('events').push(newItem);
      console.log(dat);
    } catch (error) {
      console.log(error);
    }
  }

  removeEvent(id: any) {
    console.log(id, 'DATA');
    console.log('NOT WORKING');
    return this.db.database.ref(`/events`).child(id).remove();
  }

}
