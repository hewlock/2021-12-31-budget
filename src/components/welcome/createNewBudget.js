import uuid from '../../util/uuid';
import { addAccount } from '../../state/accounts';
import { addCategory } from '../../state/categories';
import { addGroup } from '../../state/groups';
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

    function group(nameKey) {
        const id = uuid();
        const name = intl.formatMessage({ id: nameKey });
        dispatch(addGroup({
            id,
            name,
        }));
        return id;
    }

    function category(groupId, nameKey, type = 'user') {
        const id = uuid();
        const name = intl.formatMessage({ id: nameKey });
        dispatch(addCategory({
            groupId,
            id,
            name,
            type,
        }));
        return id;
    }

    let groupId = group('new.group.system');
    const systemId = category(groupId, 'new.category.initial-balance', 'initial-balance');

    groupId = group('new.group.food');
    category(groupId, 'new.category.eating-out');
    category(groupId, 'new.category.groceries');

    groupId = group('new.group.home');
    category(groupId, 'new.category.home-insurance');
    category(groupId, 'new.category.mortgage-rent');
    category(groupId, 'new.category.utilities');

    groupId = group('new.group.transporation');
    category(groupId, 'new.category.car-insurance');
    category(groupId, 'new.category.car-payment');
    category(groupId, 'new.category.fuel');

    account('new.account.auto-loan', false, systemId);
    account('new.account.brokerage', false, systemId);
    account('new.account.cash', true, systemId);
    account('new.account.checking', true, systemId);
    account('new.account.credit-card', true, systemId);
    account('new.account.home-loan', false, systemId);
    account('new.account.savings', true, systemId);
}
