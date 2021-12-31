import action from '../util/action';
import localeComparator from '../util/localeComparator'
import reducer from '../util/reducer';
import select from '../util/select';

// Constants
export const NEW_ACCOUNT = {
    budget: true,
    id: null,
    name: '',
}

const STORE = 'accounts';

// Action Creators
const storeAction = action(STORE);
export const addAccount = storeAction('ADD');
export const editAccount = storeAction('EDIT');
export const removeAccount = storeAction('REMOVE');

// Selectors
const storeSelect = select(STORE);
export const getAccountsByOrder = storeSelect('byOrder', [], null);
export const getAccountsById = storeSelect('byId', {}, null);
export const getAccountsByBudget = storeSelect('byBudget',{}, []);

// Reducer
export default reducer(STORE, localeComparator('name'), { byBudget: 'budget' });
