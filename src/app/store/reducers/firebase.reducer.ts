import * as EventActions from '../actions';

// Define state
export interface State {
    events: any;
    loading: boolean;
    loaded: boolean;
}
// Define initial state
const initialState: State = {
    events: [],
    loaded: false,
    loading: false
};
// reducer function
export function reducer(state = initialState,
    action: EventActions.Actions): State {
    switch (action.type) {
        case EventActions.FETCH_EVENTS: {
            return {
                ...state,
                loading: true,
            };
        }
        case EventActions.FETCH_EVENTS_SUCCESS: {
            return {
                events: action.payload,
                loading: false,
                loaded: true
            };
        }
        case EventActions.PUSH_EVENT: {
            return {
                ...state
            };
        }
        case EventActions.REMOVE_EVENT: {
            return {
                ...state
            };
        }
        default: {
            return state;
        }
    }
}
export const getEventsLoading = (state: State) => state.loading;
export const getEventsLoaded = (state: State) => state.loaded;
export const getEvents = (state: State) => state.events;
