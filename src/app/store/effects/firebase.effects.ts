import { Actions, Effect } from '@ngrx/effects';
import { FETCH_EVENTS, FetchEventsSuccess, FetchEventsFail, PUSH_EVENT, FetchEvents, REMOVE_EVENT, RemoveEvent } from '../actions';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError } from 'rxjs/operators';
import { FirebaseService } from 'src/app/firebase.service';
import { of } from 'rxjs';
import { PushEvent } from '../actions/firebase.actions';

@Injectable()
export class FirebaseEffects {
    constructor(private actions$: Actions, private firebaseService: FirebaseService) { }

    @Effect()
    Fetch = this.actions$.ofType(FETCH_EVENTS)
        .pipe(
            switchMap(() => this.firebaseService.items))
        .pipe(
            map(data => new FetchEventsSuccess(data)),
            catchError(error => of(new FetchEventsFail(error)))
        );
    @Effect()
    Push = this.actions$.ofType(PUSH_EVENT)
        .pipe(
            switchMap((data: PushEvent) => this.firebaseService.pushEvent(data.payload))
        )
        .pipe(
            map(() => new FetchEvents()),
            catchError(error => of(new FetchEventsFail(error)))
        );

    @Effect()
    Remove = this.actions$.ofType(REMOVE_EVENT)
        .pipe(
            switchMap((data: RemoveEvent) => this.firebaseService.removeEvent(data.payload))
        )
        .pipe(
            map(() => new FetchEvents()),
            catchError(error => of(new FetchEventsFail(error)))
        );
}
