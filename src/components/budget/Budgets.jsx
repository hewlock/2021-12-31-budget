import './Budgets.css';
import { FormattedMessage } from 'react-intl';
import { getCategories } from '../../state/categories';
import { useSelector } from 'react-redux';

export default function Budget() {
    const categories = useSelector(getCategories);
    return (
        <div className="Budgets">
            <h1>
                <FormattedMessage id="budget.title" />
            </h1>
            <table>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.groupId}</td>
                            <td>{category.name}</td>
                            <td>{category.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
