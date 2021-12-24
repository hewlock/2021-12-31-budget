import Button from 'react-bootstrap/Button';
import EditAccountModal from './EditAccountModal.jsx';
import useBooleanState from '../../hooks/useBooleanState';
import uuid from '../../util/uuid';
import { FormattedMessage } from 'react-intl';
import { NEW_ACCOUNT, addAccount } from '../../state/accounts';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function AddAccountButton() {
    const [show, setShowTrue, setShowFalse] = useBooleanState(false);
    const [account, setAccount] = useState(NEW_ACCOUNT);
    const dispatch = useDispatch();

    const handleCancel = useCallback(() => {
        setShowFalse();
        setAccount(Object.assign({}, NEW_ACCOUNT));
    }, [setShowFalse]);

    const handleSave = useCallback((account) => {
        dispatch(addAccount(Object.assign({}, account, { id: uuid() })));
        handleCancel();
    }, [dispatch, handleCancel]);

    return (
        <>
            <EditAccountModal
                account={account}
                onCancel={handleCancel}
                onSave={handleSave}
                show={show}
                title="account.add"
            />
            <Button variant="primary" onClick={setShowTrue}>
                <FormattedMessage id="account.add" />
            </Button>
        </>
    )
}
