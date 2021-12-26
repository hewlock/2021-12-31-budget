import Form from 'react-bootstrap/Form';
import { useCallback } from 'react';

export default function CurrencyControl({
    onChange,
    value,
}) {
    const handleChange = useCallback(e => onChange(parseInt(e.target.value)), [onChange]);
    return (
        <Form.Control
            onChange={handleChange}
            type="text"
            value={value}
        />
    )
}
