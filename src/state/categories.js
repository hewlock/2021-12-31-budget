import action from '../util/action';
import localeComparator from '../util/localeComparator'
import reducer from '../util/reducer';
import select from '../util/select';

// Constants
export const NEW_CATEGORY = {
    groupId: null,
    id: null,
    name: '',
    type: '',
}

const STORE = 'categories';

// Action Creators
const storeAction = action(STORE);
export const addCategory = storeAction('ADD');
export const editCategory = storeAction('EDIT');
export const removeCategory = storeAction('REMOVE');

// Selectors
const storeSelect = select(STORE);
export const getCategoriesByOrder = storeSelect('byOrder', [], null);
export const getCategoriesById = storeSelect('byId', {}, null);
export const getCategoriesByGroupId = storeSelect('byGroupId',{}, []);
export const getCategoriesByType = storeSelect('byType',{}, []);

// Reducer
export default reducer(STORE, localeComparator('name'), {
    byGroupId: 'groupId',
    byType: 'type',
});
