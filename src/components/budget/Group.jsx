import Accordion from 'react-bootstrap/Accordion';
import Category from './Category';
import { getCategoriesByGroupId } from '../../state/categories';
import { getGroupsById } from '../../state/groups';
import { useSelector } from 'react-redux';

export default function Group({ groupId }) {
    const group = useSelector(state => getGroupsById(state, groupId));
    const categories = useSelector(state => getCategoriesByGroupId(state, groupId));

    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>
                    {group.name}
                </Accordion.Header>
                <Accordion.Body>
                    {categories.map(category => (
                        <Category key={category.id} categoryId={category.id} />
                    ))}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
