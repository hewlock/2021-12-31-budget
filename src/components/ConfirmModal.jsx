import './ConfirmModal.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FormattedMessage } from 'react-intl';

export default function ConfirmModal({
    cancelKey = 'cancel',
    cancelVariant = 'secondary',
    confirmKey = 'ok',
    confirmVariant = 'primary',
    detailsKey,
    detailsValues = {},
    messageKey,
    messageValues = {},
    onCancel,
    onConfirm,
    show,
    titleKey,
}) {
    return (
        <Modal
            dialogClassName="ConfirmModal"
            onHide={onCancel}
            show={show}
        >
            <Modal.Header closeButton={true}>
                <Modal.Title>
                    <FormattedMessage id={titleKey} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="mb-0">
                    <FormattedMessage id={messageKey} values={messageValues} />
                </p>
                {detailsKey &&
                    <p className="mb-0 mt-3">
                        <FormattedMessage id={detailsKey} values={detailsValues} />
                    </p>
                }
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
