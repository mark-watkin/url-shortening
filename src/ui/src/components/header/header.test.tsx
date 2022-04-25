import renderer from 'react-test-renderer';
import { Header } from './header';

it('renders correctly', () => {
  const tree = renderer
    .create(<Header title="Testing"/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});