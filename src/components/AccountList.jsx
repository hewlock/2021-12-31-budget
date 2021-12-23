import Account from './Account';
import { FormattedMessage } from 'react-intl';
import { getAccounts } from '../state/accounts';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function AccountList({ budget }) {
    const allAccounts = useSelector(getAccounts);
    const accounts = useMemo(() =>
        allAccounts.filter(account => account.budget === budget),
        [allAccounts, budget]
    );

    return (
        <div>
            <h1>
                <FormattedMessage id={`account.${budget ? 'on' : 'off'}`} />
            </h1>
            {accounts.map(account => (
                <Account
                    accountId={account.id}
                    key={account.id}
                />
            ))}
        </div>
    );
}
