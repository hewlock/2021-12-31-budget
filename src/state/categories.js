import normalize, { add } from '../util/reducer.js'

// Constants

const INTIAL_STATE = {
    byId: {},
    byOrder: [],
    byGroupId: {},
    byType: {},
};

export const NEW_CATEGORY = {
    groupId: null,
    id: null,
    name: '',
    type: '',
}

const INDICES = {
    byGroupId: 'groupId',
    byType: 'type',
}

function comparator(a, b) {
    return a.name.localeCompare(b.name)
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

export function getCategoriesByGroupId(state, groupId) {
    return state.categories.byGroupId[groupId];
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
