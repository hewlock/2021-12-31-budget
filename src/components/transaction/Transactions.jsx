import './Transactions.css';
import AddTransaction from './AddTransaction';
import Currency from '../Currency.jsx';
import { FormattedMessage } from 'react-intl';
import { getAccountById } from '../../state/accounts';
import { getCategoryById } from '../../state/categories';
import { getFilters } from '../../state/filters';
import { getTransactions, getTransactionById } from '../../state/transactions';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

function Row({ transactionId }) {
    const transaction = useSelector(state => getTransactionById(state, transactionId));
    const category = useSelector(state => getCategoryById(state, transaction.categoryId));
    const account = useSelector(state => getAccountById(state, transaction.accountId));

    return (
        <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{transaction.date}</td>
            <td>{account.name}</td>
            <td>{category.group} : {category.name}</td>
            <td className="text-end"><Currency value={transaction.amount}/></td>
        </tr>
    );
}

export default function Transaction() {
    const allTransactions = useSelector(getTransactions);
    const filters = useSelector(getFilters);
    const transactions = useMemo(() => {
        if (!filters.accountId) {
            return allTransactions;
        }
        return allTransactions.filter(trans => trans.accountId === filters.accountId);
    }, [allTransactions, filters]);

    return (
        <div className="Transactions">
            <h1>
                <FormattedMessage id="transaction.title" />
            </h1>
            <table>
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            <FormattedMessage id="date" />
                        </th>
                        <th>
                            <FormattedMessage id="account" />
                        </th>
                        <th>
                            <FormattedMessage id="category" />
                        </th>
                        <th>
                            <FormattedMessage id="amount" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <Row
                            key={transaction.id}
                            transactionId={transaction.id}
                        />
                    ))}
                    <AddTransaction />
                </tbody>
            </table>
        </div>
    );
}
