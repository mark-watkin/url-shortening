import renderer from 'react-test-renderer';
import { Container } from './container';

it('renders correctly', () => {
  const tree = renderer
    .create(<Container>Stuff</Container>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});