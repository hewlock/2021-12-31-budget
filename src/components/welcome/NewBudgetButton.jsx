import Button from 'react-bootstrap/Button';
import createNewBudget from './createNewBudget';
import { FormattedMessage } from 'react-intl';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

export default function NewBudgetButton({ onContinue }) {
    const dispatch = useDispatch();
    const intl = useIntl();

    const handleClick = useCallback(() => {
        createNewBudget(dispatch, intl)
        onContinue();
    }, [dispatch, intl, onContinue]);

    return (
        <Button variant="primary" onClick={handleClick}>
            <FormattedMessage id="welcome.new" />
        </Button>
    );
}
