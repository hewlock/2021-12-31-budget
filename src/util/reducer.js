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

export default function normalize(byId, comparator, indices = {}) {
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
