import Accordion from 'react-bootstrap/Accordion';
import Account from './Account';
import Currency from '../Currency'
import { FormattedMessage } from 'react-intl';
import { getAccounts } from '../../state/accounts';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function AccountList({ budget }) {
    const allAccounts = useSelector(getAccounts);
    const accounts = useMemo(() =>
        allAccounts.filter(account => account.budget === budget),
        [allAccounts, budget]
    );

    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>
                    <span className="btn-account__name">
                        <FormattedMessage id={`account.${budget ? 'on' : 'off'}`} />
                    </span>
                    <span className="btn-account__amount">
                        <Currency value={-12345678} symbol={true} />
                    </span>
                </Accordion.Header>
                <Accordion.Body>
                    {accounts.map(account => (
                        <Account
                            accountId={account.id}
                            key={account.id}
                        />
                    ))}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
