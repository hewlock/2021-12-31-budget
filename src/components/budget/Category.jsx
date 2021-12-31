import { getCategoryById } from '../../state/categories';
import { useSelector } from 'react-redux';

export default function Category({ categoryId }) {
    const category = useSelector(state => getCategoryById(state, categoryId));

    return (
        <div>
            {category.name}
        </div>
    );
}
