import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { FormattedMessage } from 'react-intl';
import { forwardRef, useCallback } from 'react';

export const ContextMenuButton = forwardRef(({ children, onClick, onLeftClick, ...props }, ref) => (
    <Button ref={ref} onContextMenu={onClick} onClick={onLeftClick} {...props} >
        {children}
    </Button>
));

function Item({
    action,
    onClick,
}) {
    const handleClick = useCallback(() => { onClick(action) }, [action, onClick]);

    return (
        <Dropdown.Item as={Button} onClick={handleClick}>
            <FormattedMessage id={action}/>
        </Dropdown.Item>
    );
}

export default function ContextMenu({
    actions,
    children,
    id,
    onAction,
    onClick,
    variant = 'context-menu',
}) {
    return (
        <Dropdown>
            <Dropdown.Toggle
                as={ContextMenuButton}
                id={id}
                onLeftClick={onClick}
                variant={variant}
            >
                {children}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {actions.map(action =>
                    <Item
                        action={action}
                        key={action}
                        onClick={onAction}
                    />
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}
