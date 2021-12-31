export default function select(store) {
    return function(index, defaultIndex, defaultItem) {
        return function(state, id) {
            const items = state[store][index] || defaultIndex;
            if (undefined === id) {
                return items;
            }
            const item = items[id];
            if (undefined === item) {
                return defaultItem;
            }
            return item;
        }
    }
}
