import ActionMenu from '../ActionMenu';
import Currency from '../Currency';
import TransactionForm from './TransactionForm';
import uuid from '../../util/uuid';
import { editTransaction, removeTransaction } from '../../state/transactions';
import { getAccountById } from '../../state/accounts';
import { getCategoryById } from '../../state/categories';
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

const VIEW_ACTIONS = ['edit', 'delete'];
const EDIT_ACTIONS = ['save', 'cancel', 'delete'];

export default function Transaction({ transactionId }) {
    const dispatch = useDispatch();
    const transaction = useSelector(state => getTransactionById(state, transactionId));
    const account = useSelector(state => getAccountById(state, transaction.accountId));
    const category = useSelector(state => getCategoryById(state, transaction.categoryId));
    const [form, setForm] = useState(() => newForm(transaction));
    const [edit, setEdit] = useState(false);

    const handleAction = useCallback((action, form) => {
        if (action === 'edit') {
            setEdit(true);
        }
        if (action === 'save') {
            dispatch(editTransaction({
                accountId: form.accountId,
                amount: form.amount,
                categoryId: form.categoryId,
                date: form.date,
                id: form.id,
            }));
            setEdit(false);
        }
        if (action === 'cancel') {
            setForm(newForm(transaction));
            setEdit(false);
        }
        if (action === 'delete') {
            dispatch(removeTransaction(transaction));
        }
    }, [dispatch, setForm, setEdit, transaction]);

    return edit ? (
        <TransactionForm
            actions={EDIT_ACTIONS}
            form={form}
            key={form.key}
            onAction={handleAction}
            onChange={setForm}
        />
    ) : (
        <tr>
            <td>{transaction.date}</td>
            <td>{account.name}</td>
            <td>
                {category.group}: {category.name}
            </td>
            <td className="text-end">
                <Currency value={transaction.amount} />
            </td>
            <td>
                <ActionMenu actions={VIEW_ACTIONS} onAction={handleAction} />
            </td>
        </tr>
    );
}
