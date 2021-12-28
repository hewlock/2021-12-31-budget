import './Navigation.css';
import AccountList from './AccountList';
import AddAccountButton from './AddAccountButton';
import Currency from '../Currency.jsx';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { clearFilters } from '../../state/filters';
import { getTransactions } from '../../state/transactions';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export default function Nav() {
    const transactions = useSelector(getTransactions);
    const amount = useMemo(() => transactions.reduce((acc, trans) => acc + trans.amount, 0), [transactions]);
    const dispatch = useDispatch();

    const handleClickTransactions = useCallback(() => {
        dispatch(clearFilters());
    }, [dispatch]);

    return (
        <nav className="Navigation flex-shrink-0 p-3 bg-white">
            <h1 className="fs-5 fw-bold">
                <Link
                    className="text-body text-decoration-none"
                    to="/"
                >
                    <FormattedMessage id="app.title" />
                </Link>
            </h1>
            <div className="list-group">
                <Link
                    className="list-group-item list-group-item-action"
                    to="/app/budgets"
                >
                    <FormattedMessage id="navigation.budget" />
                </Link>
                <Link
                    className="list-group-item list-group-item-action"
                    to="/app/reports"
                >
                    <FormattedMessage id="navigation.reports" />
                </Link>
                <Link
                    className="d-flex list-group-item list-group-item-action"
                    onClick={handleClickTransactions}
                    to="/app/transactions"
                >
                    <span className="flex-grow-1">
                        <FormattedMessage id="navigation.transactions" />
                    </span>
                    <Currency value={amount} symbol={true} />
                </Link>
            </div>
            <AccountList budget={true} />
            <AccountList budget={false} />
            <AddAccountButton />
        </nav>
    );
}
