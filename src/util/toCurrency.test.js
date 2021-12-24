import toCurrency from './toCurrency';

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

test('renders 0 USD', () => {
    expect(toCurrency(0, USD)).toEqual('0.00');
});

test('renders 0.01 USD', () => {
    expect(toCurrency(1, USD)).toEqual('0.01');
});

test('renders -0.01 USD', () => {
    expect(toCurrency(-1, USD)).toEqual('-0.01');
});

test('renders 1.00 USD', () => {
    expect(toCurrency(100, USD)).toEqual('1.00');
});

test('renders -1.00 USD', () => {
    expect(toCurrency(-100, USD)).toEqual('-1.00');
});

test('renders 1,000.00 USD', () => {
    expect(toCurrency(100000, USD)).toEqual('1,000.00');
});

test('renders -1,000.00 USD', () => {
    expect(toCurrency(-100000, USD)).toEqual('-1,000.00');
});

test('renders 3.21 USD', () => {
    expect(toCurrency(321, USD)).toEqual('3.21');
});

test('renders 43.21 USD', () => {
    expect(toCurrency(4321, USD)).toEqual('43.21');
});

test('renders 543.21 USD', () => {
    expect(toCurrency(54321, USD)).toEqual('543.21');
});

test('renders 6,543.21 USD', () => {
    expect(toCurrency(654321, USD)).toEqual('6,543.21');
});

test('renders 76,543.21 USD', () => {
    expect(toCurrency(7654321, USD)).toEqual('76,543.21');
});

test('renders 876,543.21 USD', () => {
    expect(toCurrency(87654321, USD)).toEqual('876,543.21');
});

test('renders 9,876,543.21 USD', () => {
    expect(toCurrency(987654321, USD)).toEqual('9,876,543.21');
});

test('renders 9,876,543.21 USD', () => {
    expect(toCurrency(987654321, USD)).toEqual('9,876,543.21');
});

test('renders 3,219,876,543.21 USD', () => {
    expect(toCurrency(321987654321, USD)).toEqual('3,219,876,543.21');
});

test('renders 32^^19^^87^^65*4321 FICTIONAL', () => {
    expect(toCurrency(321987654321, FICTIONAL)).toEqual('32^^19^^87^^65*4321');
});
