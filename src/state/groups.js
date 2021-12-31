import normalize, { add } from '../util/reducer.js'

// Constants

const INTIAL_STATE = {
    byId: {},
    byOrder: [],
};

export const NEW_GROUP = {
    id: null,
    name: '',
}

const INDICES = {}

function comparator(a, b) {
    return a.name.localeCompare(b.name)
}

// Actions

const ADD = 'groups/ADD';

// Action Creators

export function addGroup(group) {
    return {
        type: ADD,
        payload: group,
    }
}

// Selectors

export function getGroupsById(state) {
    return state.groups.byId;
}

export function getGroupById(state, id) {
    return state.groups.byId[id];
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
