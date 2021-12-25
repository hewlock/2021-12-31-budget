const initialState = {
    byId: {},
    byOrder: [],
};

// Constants

export const NEW_CATEGORY = {
    group: '',
    id: null,
    name: '',
}

// Actions

const ADD = 'categories/ADD';

// Action Creators

export function addCategory(category) {
    return {
        type: ADD,
        payload: category,
    }
}

// Selectors

export function getCategories(state) {
    return state.categories.byOrder;
}

export function getCategoryById(state, id) {
    return state.categories.byId[id];
}

// Reducer

function normalize(byId) {
    return {
        byId,
        byOrder: Object.values(byId).sort((a, b) => {
            const c = a.group.localeCompare(b.group);
            return (0 !== c) ? c : a.name.localeCompare(b.name)
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
