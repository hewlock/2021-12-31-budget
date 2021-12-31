import Form from 'react-bootstrap/Form';
import uuid from '../util/uuid';
import { FormattedMessage } from 'react-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export default function RenameControl({
    value,
    onCancel,
    onSave,
}) {
    const [current, setCurrent] = useState(value);
    const id = useMemo(() => uuid(), []);
    const ref = useRef();

    const handleChange = useCallback(e => setCurrent(e.target.value), [setCurrent]);
    const handleKeyDown = useCallback(e => {
        if (current.length > 0 && e.key === 'Enter') {
            onSave(current);
        }
        if (e.key === 'Escape') {
            onCancel();
        }
    }, [onSave, onCancel, current]);

    useEffect(() => ref.current.focus(), [ref]);

    return (
        <Form.Group controlId={id}>
            <Form.Label visuallyHidden={true}>
                <FormattedMessage id="rename" />
            </Form.Label>
            <Form.Control
                isInvalid={current.length === 0}
                onBlur={onCancel}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                ref={ref}
                value={current}
            />
        </Form.Group>
    )
}
