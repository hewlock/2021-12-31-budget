import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FormattedMessage } from 'react-intl';

export default function ConfirmModal({
    cancelKey = 'cancel',
    cancelVariant = 'secondary',
    confirmKey = 'ok',
    confirmVariant = 'primary',
    messageKey,
    messageValues = {},
    onCancel,
    onConfirm,
    show,
    titleKey,
}) {
    return (
        <Modal show={show} onHide={onCancel}>
            <Modal.Header closeButton={true}>
                <Modal.Title>
                    <FormattedMessage id={titleKey} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormattedMessage id={messageKey} values={messageValues} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={cancelVariant} onClick={onCancel}>
                    <FormattedMessage id={cancelKey} />
                </Button>
                <Button variant={confirmVariant} onClick={onConfirm}>
                    <FormattedMessage id={confirmKey} />
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
