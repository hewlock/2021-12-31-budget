import TransactionForm from './TransactionForm';
import uuid from '../../util/uuid';
import { editTransaction } from '../../state/transactions';
import { getTransactionById } from '../../state/transactions';
import { useCallback, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function newForm(transaction) {
    return {
        key: uuid(),

        accountId: transaction.accountId,
        amount: transaction.amount,
        categoryId: transaction.categoryId,
        date: transaction.date,
        id: transaction.id,

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

const ACTION_KEYS = ['reset', 'delete'];

export default function Transaction({ transactionId }) {
    const dispatch = useDispatch();
    const transaction = useSelector(state => getTransactionById(state, transactionId));
    const [form, setForm] = useState(() => newForm(transaction));

    const handleSave = useCallback((form) => {
        dispatch(editTransaction({
            accountId: form.accountId,
            amount: form.amount,
            categoryId: form.categoryId,
            date: form.date,
            id: form.id,
        }));
    }, [dispatch]);

    const handleAction = useCallback((key) => {
        if (key === 'reset') {
            setForm(newForm(transaction));
        }
    }, [setForm, transaction]);

    return (
        <TransactionForm
            actionKeys={ACTION_KEYS}
            form={form}
            key={form.key}
            onAction={handleAction}
            onChange={setForm}
            onSave={handleSave}
            saveKey="save"
        />
    );
}
