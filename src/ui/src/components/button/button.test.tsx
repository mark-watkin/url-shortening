import renderer from 'react-test-renderer';
import { Button } from './button';

it('renders correctly', () => {
  const tree = renderer
    .create(<Button text="Test" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});