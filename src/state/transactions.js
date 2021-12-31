import action from '../util/action';
import findWhere from '../util/findWhere';
import localeComparator from '../util/localeComparator'
import reducer from '../util/reducer';
import select from '../util/select';

// Constants
export const NEW_TRANSACTION = {
    accountId: '',
    amount: 0,
    categoryId: '',
    date: '',
    id: null,
}

const STORE = 'transactions'

// Action Creators
const storeAction = action(STORE);
export const addTransaction = storeAction('ADD');
export const editTransaction = storeAction('EDIT');
export const removeTransaction = storeAction('REMOVE');
export const removeTransactionWhere = storeAction('REMOVE_WHERE');

// Selectors
const storeSelect = select(STORE);
export const getTransactionsByOrder = storeSelect('byOrder', [], null);
export const getTransactionById = storeSelect('byId', {}, null);
export const getTransactionsByAccountId = storeSelect('byAccountId', {}, []);

export function findTransactions(state, criteria) {
    return findWhere(getTransactionsByOrder(state), criteria);
}

// Reducer
export default reducer(STORE, localeComparator('date'), { byAccountId: 'accountId' });
