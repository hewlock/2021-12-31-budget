import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { fromCurrency, toCurrency } from '../util/currency';
import { getCurrency } from '../state/currency';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

export default function CurrencyControl({
    onChange,
    value,
}) {
    const currency = useSelector(getCurrency);
    const [display, setDisplay] = useState(toCurrency(value, currency));

    const handleChange = useCallback(e => {
        const stringVal = e.target.value;
        const intVal = fromCurrency(stringVal, currency);
        onChange(intVal);
        setDisplay(stringVal);
    }, [onChange, currency]);

    const handleBlur = useCallback(e => {
        if (!Number.isNaN(value)) {
            setDisplay(toCurrency(value, currency));
        }
    }, [value, setDisplay, currency]);

    return (
        <InputGroup>
            <InputGroup.Text>
                {currency.currencySymbol}
            </InputGroup.Text>
            <Form.Control
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={display}
            />
        </InputGroup>
    )
}
