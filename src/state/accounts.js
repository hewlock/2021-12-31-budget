const initialState = {
    byId: {},
    byOrder: [],
};

// Constants

export const NEW_ACCOUNT = {
    budget: true,
    id: null,
    name: '',
}

// Actions

const ADD = 'accounts/ADD';
const DELETE = 'accounts/DELETE';
const EDIT = 'accounts/EDIT';

// Action Creators

export function addAccount(account) {
    return {
        type: ADD,
        payload: account,
    }
}

export function deleteAccount(account) {
    return {
        type: DELETE,
        payload: account,
    }
}

export function editAccount(account) {
    return {
        type: EDIT,
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

// Reducer

function normalize(byId) {
    return {
        byId,
        byOrder: Object.values(byId).sort((a, b) => a.name.localeCompare(b.name)),
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case ADD:
        return normalize({
            ...state.byId,
            [action.payload.id]: action.payload
        });
    case DELETE:
        return normalize(state.byOrder.reduce((acc, account) => {
            if (account.id !== action.payload.id) {
                acc[account.id] = account;
            }
            return acc;
        }, {}));
    case EDIT:
        return normalize({
            ...state.byId,
            [action.payload.id]: action.payload
        });
    default:
        return state;
    }
}
