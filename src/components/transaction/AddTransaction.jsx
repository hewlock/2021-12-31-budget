import CurrencyControl from '../CurrencyControl';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import uuid from '../../util/uuid';
import { FormattedMessage } from 'react-intl';
import { addTransaction } from '../../state/transactions';
import { getAccounts } from '../../state/accounts';
import { getCategories } from '../../state/categories';
import { getCurrency } from '../../state/currency';
import { useCallback, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

function newForm() {
    return {
        id: uuid(),

        accountId: '',
        amount: 0,
        categoryId: '',
        date: '',

        valid: false,
        validated: false,
        validation: {
            accountId: false,
            amount: true,
            categoryId: false,
            date: false,
        }
    };
}

function validate(form, validated = false) {
    const validation = {
        accountId: form.accountId.length > 0,
        amount: !Number.isNaN(form.amount),
        categoryId: form.categoryId.length > 0,
        date: form.date.length > 0,
    }
    return Object.assign({}, form, {
        valid: Object.values(validation).reduce((acc, val) => acc && val, true),
        validated: form.validated || validated,
        validation,
    });
}

export default function AddTransaction() {
    const dispatch = useDispatch();
    const accounts = useSelector(getAccounts);
    const categories = useSelector(getCategories);
    const currency = useSelector(getCurrency);
    const [form, setForm] = useState(() => newForm());

    const handleBlur = useCallback((e) => {
        setForm(validate(form));
    }, [form, setForm]);

    const handleChange = useCallback((e) => {
        setForm(Object.assign({}, form, { [e.target.name]: e.target.value }));
    }, [form, setForm]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            const validated = validate(form, true);
            if (validated.valid) {
                dispatch(addTransaction({
                    accountId: validated.accountId,
                    amount: validated.amount,
                    categoryId: validated.categoryId,
                    date: validated.date,
                    id: validated.id,
                }));
                setForm(newForm());
            }
            else {
                setForm(validated);
            }
        }
        else if (e.key === 'Escape') {
            setForm(newForm());
        }
    }, [dispatch, form, setForm]);

    return (
        <tr key={form.id}>
            <td>
                {form.id}
            </td>
            <td>
                <Form.Group controlId="addTransactionDate">
                    <Form.Label visuallyHidden={true}>
                        <FormattedMessage id="date" />
                    </Form.Label>
                    <Form.Control
                        isInvalid={form.validated && !form.validation.date}
                        name="date"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        type="date"
                        value={form.date}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="addTransactionAccount">
                    <Form.Label visuallyHidden={true}>
                        <FormattedMessage id="account" />
                    </Form.Label>
                    <Form.Select
                        isInvalid={form.validated && !form.validation.accountId}
                        name="accountId"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={form.accountId}
                    >
                        <option key="empty" />
                        {accounts.map(account => (
                            <option key={account.id} value={account.id}>
                                {account.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="addTransactionCategory">
                    <Form.Label visuallyHidden={true}>
                        <FormattedMessage id="category" />
                    </Form.Label>
                    <Form.Select
                        isInvalid={form.validated && !form.validation.categoryId}
                        name="categoryId"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={form.categoryId}
                    >
                        <option key="empty" />
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.group}: {category.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </td>
            <td className="text-end">
                <Form.Group controlId="addTransactionAmount">
                    <Form.Label visuallyHidden={true}>
                        <FormattedMessage id="amount" />
                    </Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                            {currency.currencySymbol}
                        </InputGroup.Text>
                        <CurrencyControl
                            isInvalid={form.validated && !form.validation.amount}
                            name="amount"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            value={form.amount}
                        />
                    </InputGroup>
                </Form.Group>
            </td>
        </tr>
    );
}
