export default function action(store){
    return function(type) {
        return (payload) => ({ type: `${store}/${type}`, payload})
    }
};
