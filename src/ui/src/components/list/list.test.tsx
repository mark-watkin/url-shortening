import renderer from 'react-test-renderer';
import { List, ListItem } from './list';

it('renders correctly', () => {
  const tree = renderer
    .create(<List>
        <ListItem primaryText="Primary" secondaryText="Secondary" />
    </List>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});