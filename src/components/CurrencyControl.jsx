import Form from 'react-bootstrap/Form';
import { fromCurrency, toCurrency } from '../util/currency';
import { getCurrency } from '../state/currency';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

export default function CurrencyControl({
    onBlur,
    onChange,
    value,
    ...props
}) {
    const currency = useSelector(getCurrency);
    const [display, setDisplay] = useState(toCurrency(value, currency));

    const handleChange = useCallback(e => {
        const stringVal = e.target.value;
        const intVal = fromCurrency(stringVal, currency);
        onChange({ ...e, target: { name: e.target.name, value: intVal }});
        setDisplay(stringVal);
    }, [onChange, currency]);

    const handleBlur = useCallback(e => {
        if (!Number.isNaN(value)) {
            setDisplay(toCurrency(value, currency));
        }
        onBlur && onBlur();
    }, [value, setDisplay, currency, onBlur]);

    return (
        <Form.Control
            {...props}
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={display}
        />
    )
}
