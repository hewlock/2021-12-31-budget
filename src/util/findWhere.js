export default function findWhere(items, criteria) {
    const keys = Object.keys(criteria);
    return items.filter(item => keys.reduce((acc, key) => acc && item[key] === criteria[key], true));
}
