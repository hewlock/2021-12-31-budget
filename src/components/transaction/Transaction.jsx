import './Transaction.css';
import Currency from '../Currency.jsx';
import { FormattedMessage } from 'react-intl';
import { getAccountById } from '../../state/accounts';
import { getCategoryById } from '../../state/categories';
import { getTransactions, getTransactionById } from '../../state/transactions';
import { useSelector } from 'react-redux';

function Row({ transactionId }) {
    const transaction = useSelector(state => getTransactionById(state, transactionId));
    const category = useSelector(state => getCategoryById(state, transaction.categoryId));
    const account = useSelector(state => getAccountById(state, transaction.accountId));

    return (
        <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{account.name}</td>
            <td>{category.group} : {category.name}</td>
            <td><Currency value={transaction.amount}/></td>
            <td>{transaction.date}</td>
        </tr>
    );
}

export default function Transaction() {
    const transactions = useSelector(getTransactions);
    return (
        <div className="Transaction">
            <h1>
                <FormattedMessage id="transaction.title" />
            </h1>
            <table>
                {transactions.map((transaction) => (
                    <Row
                        key={transaction.id}
                        transactionId={transaction.id}
                    />
                ))}
            </table>
        </div>
    );
}
