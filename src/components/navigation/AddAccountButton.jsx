import Button from 'react-bootstrap/Button';
import EditAccountModal from './EditAccountModal.jsx';
import useBooleanState from '../../hooks/useBooleanState';
import uuid from '../../util/uuid';
import { FormattedMessage } from 'react-intl';
import { addAccount } from '../../state/accounts';
import { addTransaction } from '../../state/transactions';
import { getCategoriesByType } from '../../state/categories';
import { today } from '../../util/date';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const INITIAL_FORM = {
    balance: 0,
    name: '',
    budget: true,
}

export default function AddAccountButton() {
    const dispatch = useDispatch();
    const category = useSelector(state => getCategoriesByType(state, 'initial-balance')[0]);

    const [show, setShowTrue, setShowFalse] = useBooleanState(false);
    const [form, setForm] = useState(INITIAL_FORM);

    useEffect(() => {
        if (show) {
            setForm(INITIAL_FORM);
        }
    }, [show, setForm]);

    const handleSave = useCallback(() => {
        const accountId = uuid();
        dispatch(addAccount({
            budget: form.budget,
            id: accountId,
            name: form.name,
        }));
        dispatch(addTransaction({
            accountId,
            amount: form.balance,
            categoryId: category.id,
            date: today(),
            id: uuid(),
        }));
        setShowFalse();
    }, [
        category,
        dispatch,
        form,
        setShowFalse,
    ]);

    return (
        <>
            <EditAccountModal
                form={form}
                onCancel={setShowFalse}
                onChange={setForm}
                onSave={handleSave}
                show={show}
                title="account.add"
            />
            <Button variant="primary" onClick={setShowTrue}>
                <FormattedMessage id="account.add" />
            </Button>
        </>
    )
}
