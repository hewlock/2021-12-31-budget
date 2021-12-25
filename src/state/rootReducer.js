import { combineReducers } from 'redux';

import accounts from './accounts';
import categories from './categories';
import currency from './currency';
import transactions from './transactions';

const appReducer = combineReducers({
    accounts,
    categories,
    currency,
    transactions,
});

const RESET = 'root/RESET';

export function reset() {
    return { type: RESET }
}

export default function reducer(state, action) {
    return appReducer(action.type === RESET ? undefined : state, action);
}
