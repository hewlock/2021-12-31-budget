import AccountList from './AccountList';
import AddAccountButton from './AddAccountButton';

export default function Accounts() {
    return (
        <div>
            <AccountList budget={true} />
            <AccountList budget={false} />
            <AddAccountButton />
        </div>
    );
}
