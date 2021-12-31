import ContextMenu from '../ContextMenu';
import { getCategoriesById, removeCategory } from '../../state/categories';
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

    const handleClick = useCallback(() => {
        dispatch(setFilters({ categoryId }));
        navigate("/app/transactions")
    }, [navigate, categoryId, dispatch]);

    const handleAction = useCallback(action => {
        if (action === 'delete') {
            dispatch(removeTransactionWhere({ categoryId: category.id }));
            dispatch(removeCategory(category));
        }
        console.log(action);
    }, [ category ]);

    return (
        <ContextMenu
            actions={ACTIONS}
            id={`action-${categoryId}`}
            onAction={handleAction}
            onClick={handleClick}
        >
            {category.name}
        </ContextMenu>
    );
}
