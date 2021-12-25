const initialState = {
    byId: {},
    byOrder: [],
};

// Constants

export const NEW_TRANSACTION = {
    accountId: '',
    amount: 0,
    categoryId: '',
    date: '',
    id: null,
}

// Actions

const ADD = 'transactions/ADD';

// Action Creators

export function addTransaction(transaction) {
    return {
        type: ADD,
        payload: transaction,
    }
}

// Selectors

export function getTransactions(state) {
    return state.transactions.byOrder;
}

export function getTransactionById(state, id) {
    return state.transactions.byId[id];
}

// Reducer

function normalize(byId) {
    return {
        byId,
        byOrder: Object.values(byId).sort((a, b) => {
            return a.date.localeCompare(b.date)
        }),
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case ADD:
        return normalize({
            ...state.byId,
            [action.payload.id]: action.payload
        });
    default:
        return state;
    }
}
