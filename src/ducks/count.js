const initialState = 0;

const INCREMENT = 'count/INCREMENT';

/**
 * Action Creators
 */

export function increment(payload) {
    return {
        type: INCREMENT,
        payload,
    }
}

/**
 * Selectors
 */

export function getCount(state) {
    return state.count;
}

/**
 * Reducer
 */

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case INCREMENT:
            return state + action.payload;
        default:
            return state;
    }
}
