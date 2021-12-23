import EditAccountButton from './EditAccountButton';
import { getAccountById } from '../state/accounts';
import { useSelector } from 'react-redux';

export default function Account({ accountId }) {
    const account = useSelector(state => getAccountById(state, accountId));
    return (
        <div>
            <EditAccountButton accountId={account.id} />
        </div>
    );
}
