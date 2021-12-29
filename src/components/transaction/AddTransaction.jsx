import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import TransactionForm, { validate } from './TransactionForm';
import uuid from '../../util/uuid';
import { FormattedMessage } from 'react-intl';
import { addTransaction } from '../../state/transactions';
import { useCallback, useState} from 'react';
import { useDispatch } from 'react-redux';

function newForm() {
    return {
        id: uuid(),

        accountId: '',
        amount: 0,
        categoryId: '',
        date: '',

        valid: false,
        validated: false,
        validation: {
            accountId: false,
            amount: true,
            categoryId: false,
            date: false,
        }
    };
}

export default function AddTransaction() {
    const dispatch = useDispatch();
    const [form, setForm] = useState(() => newForm());

    const handleAdd = useCallback((e) => {
        const validated = validate(form, true);
        if (validated.valid) {
            dispatch(addTransaction({
                accountId: validated.accountId,
                amount: validated.amount,
                categoryId: validated.categoryId,
                date: validated.date,
                id: validated.id,
            }));
            setForm(newForm());
        }
        else {
            setForm(validated);
        }
    }, [dispatch, form, setForm]);

    const handleReset = useCallback((e) => {
        setForm(newForm());
    }, [setForm]);

    return (
        <TransactionForm
            form={form}
            key={form.id}
            onChange={setForm}
        >
            <Dropdown as={ButtonGroup}>
                <Button variant="primary" onClick={handleAdd}>
                    <FormattedMessage id="add" />
                </Button>
                <Dropdown.Toggle split={true} variant="primary" />
                <Dropdown.Menu>
                    <Dropdown.Item as={Button} onClick={handleReset}>
                        <FormattedMessage id="reset" />
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </TransactionForm>
    );
}
