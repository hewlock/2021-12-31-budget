import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import CurrencyControl from '../CurrencyControl';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormattedMessage } from 'react-intl';
import { getAccounts } from '../../state/accounts';
import { getCategories } from '../../state/categories';
import { getCurrency } from '../../state/currency';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';


export function validate(form, validated = false) {
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

function Action({ actionKey, onClick }) {
    const handleClick = useCallback(() => onClick(actionKey), [actionKey, onClick])

    return (
        <Dropdown.Item as={Button} onClick={handleClick}>
            <FormattedMessage id={actionKey}/>
        </Dropdown.Item>
    );
}

export default function TransactionForm({
    actionKeys,
    children,
    form,
    onAction,
    onChange,
    onSave,
    saveKey,
}) {
    const accounts = useSelector(getAccounts);
    const categories = useSelector(getCategories);
    const currency = useSelector(getCurrency);

    const handleBlur = useCallback((e) => {
        onChange(validate(form));
    }, [form, onChange]);

    const handleChange = useCallback((e) => {
        onChange(Object.assign({}, form, { [e.target.name]: e.target.value }));
    }, [form, onChange]);

    const handleSave = useCallback(() => {
        const validated = validate(form, true);
        if (validated.valid) {
            onSave(validated);
        }
        else {
            onChange(validated);
        }
    }, [form, onChange, onSave]);

    return (
        <tr>
            <td>
                {form.id}
            </td>
            <td>
                <Form.Group controlId={`${form.id}-date`}>
                    <Form.Label visuallyHidden={true}>
                        <FormattedMessage id="date" />
                    </Form.Label>
                    <Form.Control
                        isInvalid={form.validated && !form.validation.date}
                        name="date"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="date"
                        value={form.date}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId={`${form.id}-account`}>
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
                <Form.Group controlId={`${form.id}-category`}>
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
                <Form.Group controlId={`${form.id}-amount`}>
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
                            value={form.amount}
                        />
                    </InputGroup>
                </Form.Group>
            </td>
            <td>
                <Dropdown as={ButtonGroup}>
                    <Button variant="primary" onClick={handleSave}>
                        <FormattedMessage id={saveKey} />
                    </Button>
                    <Dropdown.Toggle split={true} variant="primary" />
                    <Dropdown.Menu>
                        {actionKeys.map(actionKey => (
                            <Action
                                actionKey={actionKey}
                                key={actionKey}
                                onClick={onAction}
                            />
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    );
}
