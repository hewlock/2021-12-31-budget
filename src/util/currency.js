function group(value, size, sep) {
    const len = value.length;
    if (value.length <= size) {
        return value;
    }
    const suffix = value.substring(len - size);
    const prefix = group(value.substring(0, len - size), size, sep);
    return `${prefix}${sep}${suffix}`;
}

export function toCurrency(value, currency) {
    const { decimalSize, decimalSymbol, groupSize, groupSymbol } = currency;

    const negative = value < 0;
    const parsed = Math.abs(value);
    const padded = parsed.toString().padStart(decimalSize + 1, "0");
    const decimalPosition = padded.length - decimalSize;
    const fraction = padded.substring(decimalPosition);
    const whole = group(padded.substring(0, decimalPosition), groupSize, groupSymbol);
    return `${negative ? '-' : ''}${whole}${decimalSymbol}${fraction}`;
}

export function fromCurrency(value, currency) {
    const trimmed = value.trim().replace(currency.groupSymbol, '');
    const negative = trimmed.startsWith('-');
    const abs = negative ? trimmed.substring(1) : trimmed;
    const split = abs.split(currency.decimalSymbol);

    if (split.length > 2) {
        return Number.NaN;
    }

    const whole = parseInt(split[0], 10)
    if (Number.isNaN(whole)) {
        return Number.NaN;
    }

    let fraction = 0;
    if (split.length === 2) {
        const significant = split[1].substring(0, currency.decimalSize);
        fraction = parseInt(significant, 10);
        if (Number.isNaN(fraction)) {
            return Number.NaN;
        }
        fraction = fraction * Math.pow(10, currency.decimalSize - significant.length);
    }

    return (negative ? -1 : 1) * ((whole * Math.pow(10, currency.decimalSize)) + fraction);
}
