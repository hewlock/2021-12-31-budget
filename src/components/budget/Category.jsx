import ConfirmModal from '../ConfirmModal';
import ContextMenu from '../ContextMenu';
import RenameControl from '../RenameControl';
import useBooleanState from '../../hooks/useBooleanState';
import { editCategory, getCategoriesById, removeCategory } from '../../state/categories';
import { removeTransactionWhere } from '../../state/transactions';
import { setFilters } from '../../state/filters';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ACTIONS = ['rename', 'delete']

export default function Category({ categoryId }) {
    const category = useSelector(state => getCategoriesById(state, categoryId));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rename, setRenameTrue, setRenameFalse] = useBooleanState(false);
    const [confirm, setConfirmTrue, setConfirmFalse] = useBooleanState(false);

    const handleClick = useCallback(() => {
        dispatch(setFilters({ categoryId }));
        navigate("/app/transactions")
    }, [navigate, categoryId, dispatch]);

    const handleAction = useCallback(action => {
        if (action === 'delete') {
            setConfirmTrue();
        }
        if (action === 'rename') {
            setRenameTrue();
        }
    }, [setConfirmTrue, setRenameTrue]);

    const handleDelete = useCallback(() => {
        dispatch(removeTransactionWhere({ categoryId: category.id }));
        dispatch(removeCategory(category));
    }, [dispatch, category]);

    const handleRename = useCallback(name => {
        dispatch(editCategory(Object.assign({}, category, { name })));
        setRenameFalse();
    }, [category, dispatch, setRenameFalse]);

    return (
        <>
            <ConfirmModal
                confirmKey="delete"
                confirmVariant="danger"
                detailsKey="category.confirm-delete-details"
                messageKey="category.confirm-delete"
                messageValues={category}
                onCancel={setConfirmFalse}
                onConfirm={handleDelete}
                show={confirm}
                titleKey="category.delete"
            />
            {rename &&
                <RenameControl
                    onCancel={setRenameFalse}
                    onSave={handleRename}
                    value={category.name}
                />
            }
            {!rename &&
                <ContextMenu
                    actions={ACTIONS}
                    id={`action-${categoryId}`}
                    onAction={handleAction}
                    onClick={handleClick}
                >
                    {category.name}
                </ContextMenu>
            }
        </>
    );
}
