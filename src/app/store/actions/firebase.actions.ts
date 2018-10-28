import { Action } from '@ngrx/store';

export const FETCH_EVENTS = '[FETCH] EVENTS';
export const FETCH_EVENTS_SUCCESS = '[FETCH] EVENTS Success';
export const FETCH_EVENTS_FAIL = '[FETCH] EVENTS Fail';
export const PUSH_EVENT = '[PUSH] EVENT';
export const REMOVE_EVENT = '[REMOVE] EVENT';

export class FetchEvents implements Action {
    readonly type = FETCH_EVENTS;
    constructor() { }
}
export class FetchEventsSuccess implements Action {
    readonly type = FETCH_EVENTS_SUCCESS;
    constructor(public payload: any) { }
}

export class FetchEventsFail implements Action {
    readonly type = FETCH_EVENTS_FAIL;
    constructor(public payload: any) { }
}

export class PushEvent implements Action {
    readonly type = PUSH_EVENT;
    constructor(public payload: any) { }

}

export class RemoveEvent implements Action {
    readonly type = REMOVE_EVENT;
    constructor(public payload: any) { }
}

export type Actions = FetchEvents | FetchEventsSuccess | FetchEventsFail | PushEvent | RemoveEvent;
