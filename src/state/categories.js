import normalize, { add } from '../util/reducer.js'

// Constants

const INTIAL_STATE = {
    byId: {},
    byOrder: [],
    byType: {},
};

export const NEW_CATEGORY = {
    group: '',
    id: null,
    name: '',
    type: '',
}

const INDICES = {
    byType: 'type'
}

function comparator(a, b) {
    const group = a.group.localeCompare(b.group);
    return (0 !== group) ? group : a.name.localeCompare(b.name)
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

export function getCategoriesByType(state, type) {
    return state.categories.byType[type];
}

// Reducer

export default function reducer(state = INTIAL_STATE, action) {
    switch (action.type) {
    case ADD:
        return normalize(add(state.byId, action.payload), comparator, INDICES);
    default:
        return state;
    }
}
