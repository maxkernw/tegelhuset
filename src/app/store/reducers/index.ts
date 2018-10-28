import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';

import * as fromFirebase from './firebase.reducer';

export interface State {
  events: fromFirebase.State;
}

export const reducers: ActionReducerMap<State> = {
  events: fromFirebase.reducer
};

export const getGlobalState = createFeatureSelector<State>(
  'global'
);

// Overview State
export const getEventsState = createSelector(
  getGlobalState,
  (state: State) => state.events
);

export const getAllEvents = createSelector(getEventsState, fromFirebase.getEvents);
export const getSightingsLoaded = createSelector(getEventsState, fromFirebase.getEventsLoaded);
export const getSightingsLoading = createSelector(getEventsState, fromFirebase.getEventsLoading);
