import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import * as reducer from '../store/reducers/firebase.reducer';
import * as M from 'materialize-css';

import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Store } from '@ngrx/store';
import { FetchEvents, PushEvent, RemoveEvent } from '../store/actions/firebase.actions';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
  viewDate = new Date();
  events: Array<{ start: Date, end: Date, title: string, color: { primary: string, secondary: string }, id: any }> = [];
  myform: FormGroup;
  activeDayIsOpen = false;
  monthEvents: any[] = [];
  refresh: Subject<any> = new Subject();
  view = 'month';
  currentUser = '';
  ref: any;

  actions: any[] = [
    {
      label: '',
      onClick: (ev): void => {
        this.handleEvent(ev, null);
      }
    }
  ];
  constructor(private store: Store<reducer.State>, private authService: AuthService) { }

  ngOnInit() {
    console.log(this.authService.getUser());
    this.store.select('events').subscribe(event => {
      this.addEvent(event);
    });

    this.myform = new FormGroup({
      title: new FormControl('', Validators.minLength(2)),
      date: new FormControl('', Validators.minLength(1)),
      time: new FormControl(),
      endtime: new FormControl()
    });
    this.store.dispatch(new FetchEvents());


  }

  addEvent(a) {
    this.events = [];
    for (const eva in a.events) {
      if (eva) {
        this.createEvent(a, eva);
      }
    }
  }

  private createEvent(a: any, eva: string) {
    const ev = a.events[eva];
    const start = new Date(ev.start);
    const end = new Date(ev.end);
    this.events.push({
      start: start,
      end: end,
      // tslint:disable-next-line:max-line-length
      title: `${ev.title}  användare: ${ev.email} tid: ${(start.getHours() < 10 ? '0' : '') + start.getHours()}:${(start.getMinutes() < 10 ? '0' : '') + start.getMinutes()} till: ${(end.getHours() < 10 ? '0' : '') + end.getHours()}:${(end.getMinutes() < 10 ? '0' : '') + end.getMinutes()} <i class="fa fa-fw fa-times"></i>`,
      color: { primary: ev.color, secondary: ev.color },
      id: eva,
    });
  }

  pushData() {
    if (this.myform.valid) {
      const id = '_' + Math.random().toString(36).substr(2, 9);
      const [startHour, startMinute] = this.myform.value.time.split(':');
      const [endHour, endMinute] = this.myform.value.endtime.split(':');
      const start = new Date(this.myform.value.date).setHours(parseInt(startHour, null), parseInt(startMinute, null));
      const end = new Date(start).setHours(parseInt(endHour, null), parseInt(endMinute, null));
      this.checkDatesOverlapped(start, end);

      const newEvent = {
        start: start,
        end: end,
        title: this.myform.value.title,
        email: this.authService.getUser().email,
        id: id,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
      };
      this.store.dispatch(new PushEvent(newEvent));
      this.myform.reset();
      M.toast({ html: `Bokat ${new Date(start).toLocaleString()}` });

    }
  }

  checkDatesOverlapped(start: number, end: number): any {
    this.events.forEach(event => {
      if (start <= event.end.getTime() && end >= event.start.getTime()) {
        throw new Error('OVERLAPPING');
      }
    });
  }

  handleEvent(ev, eva) {
    console.log(ev);
    this.store.dispatch(new RemoveEvent(eva));
  }

  dayClicked({ date, events }: { date: Date, events: any[] }) {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true)
        || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
        this.monthEvents = events;
      }
    }

    this.myform.controls['date'].setValue(date.toLocaleDateString());

  }

}
