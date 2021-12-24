import uuid from '../../util/uuid';
import { addAccount } from '../../state/accounts';

export default function createNewBudget(dispatch, intl) {
    function account(nameKey, budget) {
        const id = uuid();
        const name = intl.formatMessage({ id: nameKey });
        dispatch(addAccount({ name, budget, id }));
    }

    account('new.auto-loan', false);
    account('new.brokerage', false);
    account('new.cash', true);
    account('new.checking', true);
    account('new.credit-card', true);
    account('new.home-loan', false);
    account('new.savings', true);
}
