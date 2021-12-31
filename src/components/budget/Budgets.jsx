import './Budgets.css';
import Group from './Group';
import { FormattedMessage } from 'react-intl';
import { getGroupsByOrder } from '../../state/groups';
import { useSelector } from 'react-redux';

export default function Budgets() {
    const groups = useSelector(getGroupsByOrder);

    return (
        <div className="Budgets Navigation">
            <h1>
                <FormattedMessage id="budget.title" />
            </h1>
            {groups.map((group) => (
                <Group key={group.id} groupId={group.id} />
            ))}
        </div>
    );
}
