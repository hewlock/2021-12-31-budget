import { combineReducers } from 'redux';

import accounts from './accounts';
import currency from './currency';

const appReducer = combineReducers({
    accounts,
    currency,
});

const RESET = 'root/RESET';

export function reset() {
    return { type: RESET }
}

export default function reducer(state, action) {
    return appReducer(action.type === RESET ? undefined : state, action);
}
