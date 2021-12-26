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
    const keys = Object.keys(criteria);
    return Object.values(byId).reduce((acc, item) => {
        const match = keys.reduce((acc, key) => acc && item[key] === criteria[key], true)
        if (!match) {
            acc[item.id] = item;
        }
        return acc;
    }, {});
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
