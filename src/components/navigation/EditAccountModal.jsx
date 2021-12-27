import Button from 'react-bootstrap/Button';
import CurrencyControl from '../CurrencyControl';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import { FormattedMessage, useIntl } from 'react-intl';
import { getCurrency } from '../../state/currency';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

function validate(form) {
    const valid = {
        name: form.name.length > 0,
        balance: !Number.isNaN(form.balance),
    }
    valid.isValid = Object.values(valid).reduce((acc, val) => acc && val, true);
    return valid;
}

export default function EditAccountModal({
    form,
    onCancel,
    onChange,
    onSave,
    show,
    title,
}) {
    const intl = useIntl();
    const currency = useSelector(getCurrency);

    const [validated, setValidated] = useState(false);
    const [validation, setValidation] = useState({});

    const handleValidate = useCallback((e) => {
        const validation = validate(form);
        setValidation(validation);
        return validation;
    }, [form]);

    const handleNameChange = useCallback((e) =>
        onChange(Object.assign({}, form, { name: e.target.value })),
        [form, onChange]
    );
    const handleNameBlur = useCallback((e) => {
        const trimmedForm = Object.assign({}, form, { name: form.name.trim() });
        onChange(trimmedForm);
        setValidation(validate(trimmedForm));
    }, [form, onChange]);

    const handleBalanceChange = useCallback((balance) =>
        onChange(Object.assign({}, form, { balance })),
        [form, onChange]
    );

    const handleBudgetChange = useCallback((e) =>
        onChange(Object.assign({}, form, { budget: e.target.checked })),
        [form, onChange]
    );

    const handleSave = useCallback((e) => {
        e.preventDefault();
        const validation = handleValidate();
        if (validation.isValid) {
            onSave();
        }
        else {
            setValidated(true);
        }
    }, [onSave, handleValidate]);

    return (
        <Modal show={show} onHide={onCancel}>
            <Modal.Header closeButton={true}>
                <Modal.Title>
                    <FormattedMessage id={title} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSave}>
                    <Form.Group className="mb-3" controlId="editAccountModalName">
                        <Form.Label>
                            <FormattedMessage id="account.name" />
                        </Form.Label>
                        <InputGroup hasValidation={true}>
                            <Form.Control
                                isInvalid={validated && !validation.name}
                                onBlur={handleNameBlur}
                                onChange={handleNameChange}
                                type="text"
                                value={form.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                <FormattedMessage id="account.name.required" />
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="editAccountModalBalance">
                        <Form.Label>
                            <FormattedMessage id="account.balance" />
                        </Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                {currency.currencySymbol}
                            </InputGroup.Text>
                            <CurrencyControl
                                isInvalid={validated && !validation.balance}
                                onBlur={handleValidate}
                                onChange={handleBalanceChange}
                                value={form.balance}
                            />
                            <Form.Control.Feedback type="invalid">
                                <FormattedMessage id="account.balance.required" />
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="editAccountModalBudget">
                        <Form.Check
                            checked={form.budget}
                            label={intl.formatMessage({ id: 'account.include' })}
                            onChange={handleBudgetChange}
                            type="checkbox"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    <FormattedMessage id="cancel" />
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    <FormattedMessage id="save" />
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
