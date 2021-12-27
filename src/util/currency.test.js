import {
    fromCurrency,
    toCurrency,
} from './currency';

const USD = {
    currencySymbol: '$',
    decimalSize: 2,
    decimalSymbol: '.',
    groupSize: 3,
    groupSymbol: ',',
}

const FICTIONAL = {
    currencySymbol: 'FICTION',
    decimalSize: 4,
    decimalSymbol: '*',
    groupSize: 2,
    groupSymbol: '^^',
}

test('toCurrency: renders 0 USD', () => {
    expect(toCurrency(0, USD)).toEqual('0.00');
});

test('toCurrency: renders 0.01 USD', () => {
    expect(toCurrency(1, USD)).toEqual('0.01');
});

test('toCurrency: renders -0.01 USD', () => {
    expect(toCurrency(-1, USD)).toEqual('-0.01');
});

test('toCurrency: renders 1.00 USD', () => {
    expect(toCurrency(100, USD)).toEqual('1.00');
});

test('toCurrency: renders -1.00 USD', () => {
    expect(toCurrency(-100, USD)).toEqual('-1.00');
});

test('toCurrency: renders 1,000.00 USD', () => {
    expect(toCurrency(100000, USD)).toEqual('1,000.00');
});

test('toCurrency: renders -1,000.00 USD', () => {
    expect(toCurrency(-100000, USD)).toEqual('-1,000.00');
});

test('toCurrency: renders 3.21 USD', () => {
    expect(toCurrency(321, USD)).toEqual('3.21');
});

test('toCurrency: renders 43.21 USD', () => {
    expect(toCurrency(4321, USD)).toEqual('43.21');
});

test('toCurrency: renders 543.21 USD', () => {
    expect(toCurrency(54321, USD)).toEqual('543.21');
});

test('toCurrency: renders 6,543.21 USD', () => {
    expect(toCurrency(654321, USD)).toEqual('6,543.21');
});

test('toCurrency: renders 76,543.21 USD', () => {
    expect(toCurrency(7654321, USD)).toEqual('76,543.21');
});

test('toCurrency: renders 876,543.21 USD', () => {
    expect(toCurrency(87654321, USD)).toEqual('876,543.21');
});

test('toCurrency: renders 9,876,543.21 USD', () => {
    expect(toCurrency(987654321, USD)).toEqual('9,876,543.21');
});

test('toCurrency: renders 9,876,543.21 USD', () => {
    expect(toCurrency(987654321, USD)).toEqual('9,876,543.21');
});

test('toCurrency: renders 3,219,876,543.21 USD', () => {
    expect(toCurrency(321987654321, USD)).toEqual('3,219,876,543.21');
});

test('toCurrency: renders 32^^19^^87^^65*4321 FICTIONAL', () => {
    expect(toCurrency(321987654321, FICTIONAL)).toEqual('32^^19^^87^^65*4321');
});


[
    ['text', Number.NaN, USD],
    ['0.0.0', Number.NaN, USD],
    ['0', 0, USD],
    ['10', 1000, USD],
    ['12.3', 1230, USD],
    ['12.34', 1234, USD],
    ['12.3456', 1234, USD],
    ['-12.34', -1234, USD],
    ['-10', -1000, USD],
    ['1,000', 100000, USD],
    ['1000', 10000000, FICTIONAL],
    ['1^^000*1234', 10001234, FICTIONAL],
].forEach(([input, expected, currency]) => {
    test(
        `fromCurrency: parses ${input} as ${expected} in ${currency.currencySymbol}`,
        () => expect(fromCurrency(input, currency)).toEqual(expected)
    );
});
