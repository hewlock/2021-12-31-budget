import findWhere from '../util/findWhere';
import normalize, { add, edit, removeWhere } from '../util/reducer.js';

// Constants

const INITIAL_STATE = {
    byId: {},
    byOrder: [],
};

export const NEW_TRANSACTION = {
    accountId: '',
    amount: 0,
    categoryId: '',
    date: '',
    id: null,
}

const INDICES = {
    byAccountId: 'accountId'
}

function comparator(a, b) {
    return a.date.localeCompare(b.date);
}

// Actions

const ADD = 'transactions/ADD';
const EDIT = 'transactions/EDIT';
const REMOVE_WHERE = 'accounts/REMOVE_WHERE';

// Action Creators

export function addTransaction(transaction) {
    return {
        type: ADD,
        payload: transaction,
    }
}

export function editTransaction(transaction) {
    return {
        type: EDIT,
        payload: transaction,
    }
}

export function removeTransactionWhere(criteria) {
    return {
        type: REMOVE_WHERE,
        payload: criteria,
    }
}

// Selectors

export function getTransactions(state) {
    return state.transactions.byOrder;
}

export function getTransactionById(state, id) {
    return state.transactions.byId[id];
}

export function getTransactionsByAccountId(state, accountId) {
    return state.transactions.byAccountId[accountId];
}

export function findTransactions(state, criteria) {
    return findWhere(state.transactions.byOrder, criteria);
}

// Reducer

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
    case ADD:
        return normalize(add(state.byId, action.payload), comparator, INDICES);
    case EDIT:
        return normalize(edit(state.byId, action.payload), comparator, INDICES);
    case REMOVE_WHERE:
        return normalize(removeWhere(state.byId, action.payload), comparator, INDICES);
    default:
        return state;
    }
}
