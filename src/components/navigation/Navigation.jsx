import './Navigation.css';
import AccountList from './AccountList';
import AddAccountButton from './AddAccountButton';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <nav className="Navigation flex-shrink-0 p-3 bg-white">
            <h1 className="fs-5 fw-bold">
                <Link
                    className="text-body text-decoration-none"
                    to="/"
                >
                    <FormattedMessage id="app-name" />
                </Link>
            </h1>
            <div className="list-group ">
                <Link
                    className="list-group-item list-group-item-action"
                    to="/app/budget"
                >
                    <FormattedMessage id="navigation.budget" />
                </Link>
                <Link
                    className="list-group-item list-group-item-action"
                    to="/app/report"
                >
                    <FormattedMessage id="navigation.reports" />
                </Link>
                <Link
                    className="list-group-item list-group-item-action"
                    to="/app/transaction"
                >
                    <FormattedMessage id="navigation.transactions" />
                </Link>
            </div>
            <AccountList budget={true} />
            <AccountList budget={false} />
            <AddAccountButton />
        </nav>
    );
}
