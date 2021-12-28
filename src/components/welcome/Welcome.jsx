import NewBudgetButton from './NewBudgetButton';
import { FormattedMessage } from 'react-intl';
import { reset } from '../../state/rootReducer';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => dispatch(reset()), [dispatch]);
    const handleContinue = useCallback(() => navigate("/app/budgets"), [navigate]);

    return (
        <div className="px-4 py-5 my-5 text-center">
            <h1 className="fw-bold display-5">
                <FormattedMessage id="app-name" />
            </h1>
            <p className="lead mb-4">
                <FormattedMessage id="welcome.lead" />
            </p>
            <div className="my-5 d-grid gap-2 d-sm-flex justify-content-sm-center">
                <NewBudgetButton onContinue={handleContinue} />
            </div>
        </div>
    );
}
