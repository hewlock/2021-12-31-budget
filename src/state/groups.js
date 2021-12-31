import action from '../util/action';
import localeComparator from '../util/localeComparator'
import reducer from '../util/reducer';
import select from '../util/select';

// Constants
export const NEW_GROUP = {
    id: null,
    name: '',
}

const STORE = 'groups';

// Action Creators
const storeAction = action(STORE);
export const addGroup = storeAction('ADD');

// Selectors
const storeSelect = select(STORE);
export const getGroupsByOrder = storeSelect('byOrder', [], null);
export const getGroupsById = storeSelect('byId', {}, null);

// Reducer
export default reducer(STORE, localeComparator('name'), {});
