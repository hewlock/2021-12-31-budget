import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FormattedMessage, useIntl } from 'react-intl';
import { useCallback, useEffect, useState } from 'react';

export default function EditAccountModal({
    account,
    onCancel,
    onSave,
    show,
    title,
}) {
    const intl = useIntl();
    const [form, setForm] = useState(account);

    useEffect(() => setForm(account), [account]);

    const handleNameChange = useCallback((e) =>
        setForm(Object.assign({}, form, { name: e.target.value })),
        [form, setForm]
    );
    const handleBudgetChange = useCallback((e) =>
        setForm(Object.assign({}, form, { budget: e.target.checked })),
        [form, setForm]
    );

    const handleSave = useCallback((e) => {
        e.preventDefault();
        onSave(form);
    }, [form, onSave]);

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
                            <FormattedMessage id="name" />
                        </Form.Label>
                        <Form.Control
                            onChange={handleNameChange}
                            type="text"
                            value={form.name}
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
