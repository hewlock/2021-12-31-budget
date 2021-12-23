import './Nav.css';
import AccountList from './AccountList';
import AddAccountButton from './AddAccountButton';
import { FormattedMessage } from 'react-intl';

export default function Nav() {
    return (
        <nav className="Nav flex-shrink-0 p-3 bg-white">
            <h1 className="fs-5 fw-bold">
                <FormattedMessage id="budget" />
            </h1>
            <AccountList budget={true} />
            <AccountList budget={false} />
            <AddAccountButton />
        </nav>
    );
}
