import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import * as reducer from '../store/reducers/firebase.reducer';
import * as M from 'materialize-css';
import * as $ from 'jquery';

import {
  isSameDay,
  isSameMonth,
  isBefore,
} from 'date-fns';
import { Store } from '@ngrx/store';
import { FetchEvents, PushEvent, RemoveEvent } from '../store/actions/firebase.actions';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
  myevents = [];

  actions: any[] = [
    {
      label: '',
      onClick: (ev): void => {
        this.handleEvent(ev, null);
      }
    }
  ];
  constructor(private store: Store<reducer.State>, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.user.subscribe(res => {
      if (!res) {
        this.router.navigate(['']);
      }
    });
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
    if (ev.email === this.authService.getUser().email) {
      this.addMyEvent(start, end, ev, eva);
    }
    this.events.push({
      start: start,
      end: end,
      // tslint:disable-next-line:max-line-length
      title: `${ev.title}  användare: ${ev.email} tid: ${(start.getHours() < 10 ? '0' : '') + start.getHours()}:${(start.getMinutes() < 10 ? '0' : '') + start.getMinutes()} till: ${(end.getHours() < 10 ? '0' : '') + end.getHours()}:${(end.getMinutes() < 10 ? '0' : '') + end.getMinutes()} <i class="fa fa-fw fa-times"></i>`,
      color: { primary: ev.color, secondary: ev.color },
      id: eva,
    });
  }

  private addMyEvent(start: Date, end: Date, ev: any, eva: string) {
    const event = {
      start: start,
      end: end,
      // tslint:disable-next-line:max-line-length
      title: `${ev.title}  användare: ${ev.email} tid: ${(start.getHours() < 10 ? '0' : '') + start.getHours()}:${(start.getMinutes() < 10 ? '0' : '') + start.getMinutes()} till: ${(end.getHours() < 10 ? '0' : '') + end.getHours()}:${(end.getMinutes() < 10 ? '0' : '') + end.getMinutes()} <i class="fa fa-fw fa-times"></i>`,
      color: { primary: ev.color, secondary: ev.color },
      id: eva,
    };
    const eventfound = this.myevents.find(x => x.id);
    if (!eventfound) {
      this.myevents.push(event);

    }
  }

  pushData() {
    if (this.myform.valid) {
      const id = '_' + Math.random().toString(36).substr(2, 9);
      const [startHour, startMinute] = this.myform.value.time.split(':');
      const [endHour, endMinute] = this.myform.value.endtime.split(':');
      const start = new Date(this.myform.value.date).setHours(parseInt(startHour, null), parseInt(startMinute, null));
      const end = new Date(start).setHours(parseInt(endHour, null), parseInt(endMinute, null));
      this.checkDatesOverlapped(start, end);
      this.checkFormat(start, end);
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
  checkFormat(start: number, end: number) {
    if (!isBefore(new Date(start), new Date(end))) {
      M.toast({ html: `KLOCKAN GÅR FRAMÅT` });
      throw new Error('WRONG FORMAT');
    }
  }

  checkDatesOverlapped(start: number, end: number): any {
    this.events.forEach(event => {
      if (start <= event.end.getTime() && end >= event.start.getTime()) {
        M.toast({ html: `TIDEN ÄR REDAN BOKAD` });
        throw new Error('OVERLAPPING');
      }
    });
  }

  handleEvent(ev, eva) {
    this.store.dispatch(new RemoveEvent(eva));
  }

  remove({ id }) {
    this.store.dispatch(new RemoveEvent(id));
    this.myevents = [];
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
