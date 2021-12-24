function group(value, size, sep) {
    const len = value.length;
    if (value.length <= size) {
        return value;
    }
    const suffix = value.substring(len - size);
    const prefix = group(value.substring(0, len - size), size, sep);
    return `${prefix}${sep}${suffix}`;
}

export default function toCurrency(value, currency) {
    const { decimalSize, decimalSymbol, groupSize, groupSymbol } = currency;

    const negative = value < 0;
    const parsed = parseInt(Math.abs(value), 10)
    const padded = parsed.toString().padStart(decimalSize + 1, "0");
    const decimalPosition = padded.length - decimalSize;
    const fraction = padded.substring(decimalPosition);
    const whole = group(padded.substring(0, decimalPosition), groupSize, groupSymbol);
    return `${negative ? '-' : ''}${whole}${decimalSymbol}${fraction}`;
}
