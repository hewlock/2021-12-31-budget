import findWhere from './findWhere';

export function add(byId, item) {
    return { ...byId, [item.id]: item };
}

export function edit(byId, item) {
    return { ...byId, [item.id]: item };
}

export function remove(byId, item) {
    const values = { ...byId };
    delete values[item.id];
    return values;
}

export function removeWhere(byId, criteria) {
    const result = {...byId};
    const items = findWhere(Object.values(byId), criteria);
    items.forEach(item => delete result[item.id]);
    return result;
}

export function normalize(byId, comparator, indices = {}) {
    return Object.keys(indices).reduce((acc, index) => {
        const property = indices[index];
        acc[index] = acc.byOrder.reduce((acc, item) => {
            const value = item[property];
            if (!acc[value]) {
                acc[value] = [];
            }
            acc[value].push(item)
            return acc;
        }, {});
        return acc;
    }, {
        byId,
        byOrder: Object.values(byId).sort(comparator)
    });
}

export default function reducer(store, comparator, indices) {
    const initialState = normalize({}, comparator, indices)
    return function(state = initialState, action) {
        switch (action.type) {
        case `${store}/ADD`:
            return normalize(add(state.byId, action.payload), comparator, indices);
        case `${store}/EDIT`:
            return normalize(edit(state.byId, action.payload), comparator, indices);
        case `${store}/REMOVE`:
            return normalize(remove(state.byId, action.payload), comparator, indices);
        case `${store}/REMOVE_WHERE`:
            return normalize(removeWhere(state.byId, action.payload), comparator, indices);
        default:
            return state;
        }
    }
}
