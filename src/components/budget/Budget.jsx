import './Budget.css';
import { FormattedMessage } from 'react-intl';
import { getCategories } from '../../state/categories';
import { useSelector } from 'react-redux';

export default function Budget() {
    const categories = useSelector(getCategories);
    return (
        <div className="Budget">
            <h1>
                <FormattedMessage id="budget.title" />
            </h1>
            <table>
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.group}</td>
                        <td>{category.name}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}
