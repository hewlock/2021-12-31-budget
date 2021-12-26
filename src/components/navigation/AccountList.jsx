import Accordion from 'react-bootstrap/Accordion';
import Account from './Account';
import Currency from '../Currency'
import { FormattedMessage } from 'react-intl';
import { getAccountsByBudget } from '../../state/accounts';
import { getTransactions } from '../../state/transactions';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function AccountList({ budget }) {
    const accounts = useSelector(state => getAccountsByBudget(state, budget));
    const transactions = useSelector(getTransactions);
    const amount = useMemo(() => {
        const index = accounts.reduce((acc, account) => {
            acc[account.id] = true;
            return acc;
        }, {});
        return transactions.reduce((acc, trans) => acc + (index[trans.accountId] ? trans.amount : 0), 0);
    }, [accounts, transactions])

    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>
                    <span className="btn-account__name">
                        <FormattedMessage id={`account.${budget ? 'on' : 'off'}`} />
                    </span>
                    <span className="btn-account__amount">
                        <Currency value={amount} symbol={true} />
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
