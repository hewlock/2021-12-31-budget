import Button from 'react-bootstrap/Button';
import ConfirmModal from '../ConfirmModal';
import ContextMenu from '../ContextMenu';
import Currency from '../Currency';
import Dropdown from 'react-bootstrap/Dropdown';
import EditAccountModal from './EditAccountModal.jsx';
import useBooleanState from '../../hooks/useBooleanState';
import uuid from '../../util/uuid';
import { FormattedMessage } from 'react-intl';
import { editAccount, getAccountById, removeAccount } from '../../state/accounts';
import { getCategoriesByType } from '../../state/categories';
import { setFilters } from '../../state/filters';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
    editTransaction,
    findTransactions,
    getTransactionsByAccountId,
    removeTransactionWhere
} from '../../state/transactions';

function toForm(account, transaction) {
    return {
        balance: transaction.amount,
        budget: account.budget,
        id: account.id,
        key: uuid(),
        name: account.name,
    };
}

function EditItem({ accountId }) {
    const dispatch = useDispatch();
    const account = useSelector(state => getAccountById(state, accountId));
    const category = useSelector(state => getCategoriesByType(state, 'initial-balance')[0]);
    const transaction = useSelector(state => findTransactions(state, { categoryId: category.id, accountId: account.id})[0]);

    const [show, setShowTrue, setShowFalse] = useBooleanState(false);
    const [form, setForm] = useState(toForm(account, transaction));

    useEffect(() => {
        if (show) {
            setForm(toForm(account, transaction));
        }
    }, [account, transaction, setForm, show]);

    const handleSave = useCallback(() => {
        const _account = Object.assign({}, account, {
            budget: form.budget,
            name: form.name,
        });
        const _transaction = Object.assign({}, transaction, {
            amount: form.balance
        });
        dispatch(editAccount(_account));
        dispatch(editTransaction(_transaction));
        setShowFalse();
    }, [
        account,
        dispatch,
        form,
        setShowFalse,
        transaction,
    ]);

    return (
        <>
            <EditAccountModal
                form={form}
                key={form.key}
                onCancel={setShowFalse}
                onChange={setForm}
                onSave={handleSave}
                show={show}
                title="account.edit"
            />
            <Dropdown.Item as={Button} onClick={setShowTrue}>
                <FormattedMessage id="account.edit" />
            </Dropdown.Item>
        </>
    );
}

function DeleteItem({ accountId }) {
    const account = useSelector(state => getAccountById(state, accountId));
    const dispatch = useDispatch();

    const [show, setShowTrue, setShowFalse] = useBooleanState(false);
    const handleDelete = useCallback(() => {
        dispatch(removeTransactionWhere({ accountId: account.id }));
        dispatch(removeAccount(account));
        setShowFalse();
    }, [dispatch, setShowFalse, account]);

    return (
        <>
            <ConfirmModal
                confirmKey="delete"
                confirmVariant="danger"
                detailsKey="account.confirm-delete-details"
                messageKey="account.confirm-delete"
                messageValues={account}
                onCancel={setShowFalse}
                onConfirm={handleDelete}
                show={show}
                titleKey="account.delete"
            />
            <Dropdown.Item as={Button} onClick={setShowTrue}>
                <FormattedMessage id="account.delete" />
            </Dropdown.Item>
        </>
    );
}

export default function Account({ accountId }) {
    const account = useSelector(state => getAccountById(state, accountId));
    const transactions = useSelector(state => getTransactionsByAccountId(state, accountId));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        dispatch(setFilters({ accountId }));
        navigate("/app/transactions")
    }, [navigate, accountId, dispatch]);

    const amount = useMemo(() => transactions.reduce((acc, trans) => acc + trans.amount, 0), [transactions]);

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle
                    as={ContextMenu}
                    id={`edit-${accountId}`}
                    onLeftClick={handleClick}
                    variant="account"
                >
                    <span className="btn-account__name">
                        {account.name}
                    </span>
                    <span className="btn-account__amount">
                        <Currency value={amount} />
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <EditItem accountId={accountId} />
                    <DeleteItem accountId={accountId} />
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}
