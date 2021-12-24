import toCurrency from '../util/toCurrency';
import { getCurrency } from '../state/currency';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function Currency({ value }) {
    const currency = useSelector(getCurrency);
    return useMemo(() => toCurrency(value, currency), [currency, value]);
}
