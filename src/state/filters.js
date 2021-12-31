const initialState = {
    accountId: null,
    categoryId: null,
}

// Actions

const CLEAR = 'filters/CLEAR';
const SET = 'filters/SET';

// Action Creators

export function clearFilters() {
    return{
        type: CLEAR,
    }
}

export function setFilters(filters) {
    return{
        type: SET,
        payload: filters,
    }
}

// Selectors

export function getFilters(state) {
    return state.filters;
}

// Reducer

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case SET:
        return Object.assign({}, initialState, action.payload);
    case CLEAR:
        return initialState;
    default:
        return state;
    }
}
