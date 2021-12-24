import { combineReducers } from 'redux';

import accounts from './accounts';

const appReducer = combineReducers({
    accounts,
});

const RESET = 'root/RESET';

export function reset() {
    return { type: RESET }
}

export default function reducer(state, action) {
    return appReducer(action.type === RESET ? undefined : state, action);
}
