import Button from 'react-bootstrap/Button';
import uuid from '../../util/uuid';
import { FormattedMessage } from 'react-intl';
import { addAccount } from '../../state/accounts';
import { reset } from '../../state/rootReducer';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function account(dispatch, name, budget) {
    dispatch(addAccount({ name, budget, id: uuid() }));
}

export default function SampleDataButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => dispatch(reset()), [dispatch]);

    const handleContinue = useCallback(() => navigate("/app"), [navigate]);

    const handleClick = useCallback(() => {
        account(dispatch, 'Checking', true);
        account(dispatch, 'Savings', true);
        account(dispatch, 'Cash', true);
        account(dispatch, 'Brokerage', false);
        account(dispatch, 'Auto Loan', false);
        handleContinue();
    }, [dispatch, handleContinue]);

    return (
        <div className="px-4 py-5 my-5 text-center">
            <h1 className="fw-bold display-5">
                <FormattedMessage id="budget" />
            </h1>
            <p className="lead mb-4">
                Zero-based budget app for personal finances
            </p>
            <div className="my-5 d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Button variant="primary" onClick={handleClick}>
                    Sample Budget
                </Button>
                <Button variant="secondary" onClick={handleContinue}>
                    New Budget
                </Button>
            </div>
        </div>
    );
}
