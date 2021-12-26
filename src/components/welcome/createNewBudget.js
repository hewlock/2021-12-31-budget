import uuid from '../../util/uuid';
import { addAccount } from '../../state/accounts';
import { addCategory } from '../../state/categories';
import { addTransaction } from '../../state/transactions';
import { today } from '../../util/date';

export default function createNewBudget(dispatch, intl) {
    function transaction(accountId, categoryId) {
        const id = uuid();
        const date = today();
        dispatch(addTransaction({
            accountId,
            amount: 0,
            categoryId,
            date,
            id,
        }));
    }

    function account(nameKey, budget, systemId) {
        const id = uuid();
        const name = intl.formatMessage({ id: nameKey });
        dispatch(addAccount({
            budget,
            id,
            name,
        }));
        transaction(id, systemId);
        return id;
    }

    function category(groupKey, nameKey, type = 'user') {
        const id = uuid();
        const group = intl.formatMessage({ id: groupKey });
        const name = intl.formatMessage({ id: nameKey });
        dispatch(addCategory({
            group,
            id,
            name,
            type,
        }));
        return id;
    }

    const systemId = category('new.group.system', 'new.category.initial-balance', 'initial-balance');

    category('new.group.food', 'new.category.eating-out');
    category('new.group.food', 'new.category.groceries');
    category('new.group.home', 'new.category.home-insurance');
    category('new.group.home', 'new.category.mortgage-rent');
    category('new.group.home', 'new.category.utilities');
    category('new.group.transporation', 'new.category.car-insurance');
    category('new.group.transporation', 'new.category.car-payment');
    category('new.group.transporation', 'new.category.fuel');

    account('new.account.auto-loan', false, systemId);
    account('new.account.brokerage', false, systemId);
    account('new.account.cash', true, systemId);
    account('new.account.checking', true, systemId);
    account('new.account.credit-card', true, systemId);
    account('new.account.home-loan', false, systemId);
    account('new.account.savings', true, systemId);
}
