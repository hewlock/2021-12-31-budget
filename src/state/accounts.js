import normalize, { add, edit, remove } from '../util/reducer.js'

// Constants

const INITIAL_STATE = {
    byBudget: {},
    byId: {},
    byOrder: [],
};

export const NEW_ACCOUNT = {
    budget: true,
    id: null,
    name: '',
}

const INDICES = {
    byBudget: 'budget'
}

function comparator(a, b) {
    return a.name.localeCompare(b.name);
}

// Actions

const ADD = 'accounts/ADD';
const EDIT = 'accounts/EDIT';
const REMOVE = 'accounts/REMOVE';

// Action Creators

export function addAccount(account) {
    return {
        type: ADD,
        payload: account,
    }
}

export function editAccount(account) {
    return {
        type: EDIT,
        payload: account,
    }
}

export function removeAccount(account) {
    return {
        type: REMOVE,
        payload: account,
    }
}

// Selectors

export function getAccounts(state) {
    return state.accounts.byOrder;
}

export function getAccountById(state, id) {
    return state.accounts.byId[id];
}

export function getAccountsByBudget(state, budget) {
    return state.accounts.byBudget[budget] || [];
}

// Reducer

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
    case ADD:
        return normalize(add(state.byId, action.payload), comparator, INDICES);
    case EDIT:
        return normalize(edit(state.byId, action.payload), comparator, INDICES);
    case REMOVE:
        return normalize(remove(state.byId, action.payload), comparator, INDICES);
    default:
        return state;
    }
}
