const initialState = {
    currencySymbol: '$',
    decimalSize: 2,
    decimalSymbol: '.',
    groupSize: 3,
    groupSymbol: ',',
}

// Actions

const SET = 'currency/SET';

// Action Creators

export function setCurrency(currency) {
    return{
        type: SET,
        payload: currency,
    }
}

// Selectors

export function getCurrency(state) {
    return state.currency;
}

// Reducer

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case SET:
        return action.payload;
    default:
        return state;
    }
}
