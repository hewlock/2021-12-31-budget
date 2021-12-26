import Accordion from 'react-bootstrap/Accordion';
import Account from './Account';
import Currency from '../Currency'
import { FormattedMessage } from 'react-intl';
import { getAccountsByBudget } from '../../state/accounts';
import { useSelector } from 'react-redux';

export default function AccountList({ budget }) {
    const accounts = useSelector(state => getAccountsByBudget(state, budget));

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
