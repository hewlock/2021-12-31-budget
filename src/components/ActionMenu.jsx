import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { FormattedMessage } from 'react-intl';
import { useCallback, useMemo } from 'react';

function Action({ action, onAction }) {
    const handleAction = useCallback(() => onAction(action), [action, onAction]);

    return (
        <Dropdown.Item as={Button} onClick={handleAction}>
            <FormattedMessage id={action}/>
        </Dropdown.Item>
    );
}

export default function ActionMenu({
    actions,
    onAction,
}) {
    const primary = useMemo(() => actions[0], [actions]);
    const secondary = useMemo(() => actions.slice(1), [actions]);
    const handleAction = useCallback(() => onAction(primary), [primary, onAction]);

    return (
        <Dropdown as={ButtonGroup}>
            <Button variant="primary" onClick={handleAction}>
                <FormattedMessage id={primary} />
            </Button>
            <Dropdown.Toggle split={true} variant="primary" />
            <Dropdown.Menu>
                {secondary.map(action => (
                    <Action
                        action={action}
                        key={action}
                        onAction={onAction}
                    />
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}
