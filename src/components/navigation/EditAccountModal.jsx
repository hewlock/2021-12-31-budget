import Button from 'react-bootstrap/Button';
import CurrencyControl from '../CurrencyControl';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FormattedMessage, useIntl } from 'react-intl';
import { useCallback } from 'react';

export default function EditAccountModal({
    form,
    onCancel,
    onChange,
    onSave,
    show,
    title,
}) {
    const intl = useIntl();

    const handleNameChange = useCallback((e) =>
        onChange(Object.assign({}, form, { name: e.target.value })),
        [form, onChange]
    );
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
        onSave();
    }, [onSave]);

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
                        <Form.Control
                            onChange={handleNameChange}
                            type="text"
                            value={form.name}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="editAccountModalBalance">
                        <Form.Label>
                            <FormattedMessage id="account.balance" />
                        </Form.Label>
                        <CurrencyControl
                            onChange={handleBalanceChange}
                            value={form.balance}
                        />
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
