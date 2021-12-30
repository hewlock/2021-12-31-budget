import TransactionForm from './TransactionForm';
import uuid from '../../util/uuid';
import { addTransaction } from '../../state/transactions';
import { useCallback, useState} from 'react';
import { useDispatch } from 'react-redux';

function newForm() {
    return {
        id: uuid(),

        accountId: '',
        amount: 0,
        categoryId: '',
        date: '',

        valid: false,
        validated: false,
        validation: {
            accountId: false,
            amount: true,
            categoryId: false,
            date: false,
        }
    };
}

const ACTIONS = ['add', 'reset'];

export default function AddTransaction() {
    const dispatch = useDispatch();
    const [form, setForm] = useState(() => newForm());

    const handleAction = useCallback((action, form) => {
        if (action === 'add') {
            dispatch(addTransaction({
                accountId: form.accountId,
                amount: form.amount,
                categoryId: form.categoryId,
                date: form.date,
                id: form.id,
            }));
            setForm(newForm());
        }
        if (action === 'reset') {
            setForm(newForm());
        }
    }, [dispatch, setForm]);

    return (
        <TransactionForm
            actions={ACTIONS}
            form={form}
            key={form.id}
            onAction={handleAction}
            onChange={setForm}
        />
    );
}
