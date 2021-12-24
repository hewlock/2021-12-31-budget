import Button from 'react-bootstrap/Button';
import ContextMenu from '../ContextMenu';
import Dropdown from 'react-bootstrap/Dropdown';
import EditAccountModal from './EditAccountModal.jsx';
import Modal from 'react-bootstrap/Modal';
import useBooleanState from '../../hooks/useBooleanState';
import { FormattedMessage } from 'react-intl';
import { deleteAccount, editAccount, getAccountById } from '../../state/accounts';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function EditItem({ accountId }) {
    const account = useSelector(state => getAccountById(state, accountId));
    const dispatch = useDispatch();

    const [show, setShowTrue, setShowFalse] = useBooleanState(false);
    const handleCancel = useCallback(() => {
        setShowFalse();
    }, [setShowFalse]);
    const handleSave = useCallback((account) => {
        dispatch(editAccount(account));
        setShowFalse();
    }, [dispatch, setShowFalse]);

    return (
        <>
            <EditAccountModal
                account={account}
                onCancel={handleCancel}
                onSave={handleSave}
                show={show}
                title="account.edit"
            />
            <Dropdown.Item onClick={setShowTrue}>
                <FormattedMessage id="account.edit" />
            </Dropdown.Item>
        </>
    );
}

function DeleteItem({ accountId }) {
    const account = useSelector(state => getAccountById(state, accountId));
    const dispatch = useDispatch();

    const [show, setShowTrue, setShowFalse] = useBooleanState(false);
    const handleDelete = useCallback(() => {
        dispatch(deleteAccount(account));
        setShowFalse();
    }, [dispatch, setShowFalse, account]);

    return (
        <>
            <Modal show={show} onHide={setShowFalse}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>
                        <FormattedMessage id="account.delete" />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormattedMessage id="account.confirm-delete" values={account} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={setShowFalse}>
                        <FormattedMessage id="cancel" />
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        <FormattedMessage id="delete" />
                    </Button>
                </Modal.Footer>
            </Modal>
            <Dropdown.Item onClick={setShowTrue}>
                <FormattedMessage id="account.delete" />
            </Dropdown.Item>
        </>
    );
}

export default function Account({ accountId }) {
    const account = useSelector(state => getAccountById(state, accountId));
    const navigate = useNavigate();
    const handleClick = useCallback(() => navigate("/app/transaction"), [navigate]);

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle
                    as={ContextMenu}
                    id={`edit-${accountId}`}
                    onLeftClick={handleClick}
                    variant="account"
                >
                    <span className="btn-account__name">
                        {account.name}
                    </span>
                    <span className="btn-account__amount">
                        $123.45
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <EditItem accountId={accountId} />
                    <DeleteItem accountId={accountId} />
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}
