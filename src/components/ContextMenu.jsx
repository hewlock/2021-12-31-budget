import Button from 'react-bootstrap/Button';
import { forwardRef } from 'react';

const ContextMenu = forwardRef(({ children, onClick, onLeftClick, ...props }, ref) => (
    <Button ref={ref} onContextMenu={onClick} onClick={onLeftClick} {...props} >
        {children}
    </Button>
));

export default ContextMenu;
