import toCurrency from '../util/toCurrency';
import { getCurrency } from '../state/currency';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function Currency({ value, symbol = false }) {
    const currency = useSelector(getCurrency);
    const display = useMemo(() => toCurrency(value, currency), [currency, value]);
    return (
        <span className={value < 0 ? 'text-danger' : ''}>
            {symbol && currency.currencySymbol}
            {display}
        </span>
    );
}
