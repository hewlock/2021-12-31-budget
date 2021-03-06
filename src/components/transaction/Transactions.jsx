import './Transactions.css';
import AddTransaction from './AddTransaction';
import Transaction from './Transaction';
import { FormattedMessage } from 'react-intl';
import { getFilters } from '../../state/filters';
import { getTransactionsByOrder } from '../../state/transactions';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function Transactions() {
    const allTransactions = useSelector(getTransactionsByOrder);
    const filters = useSelector(getFilters);
    const transactions = useMemo(() => {
        if (null !== filters.accountId) {
            return allTransactions.filter(trans => trans.accountId === filters.accountId);
        }
        if (null !== filters.categoryId) {
            return allTransactions.filter(trans => trans.categoryId === filters.categoryId);
        }
        return allTransactions;
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
                        <th>
                            <FormattedMessage id="actions" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <Transaction
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
