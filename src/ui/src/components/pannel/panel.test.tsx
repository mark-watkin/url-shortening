import renderer from 'react-test-renderer';
import { Pannel } from './pannel';

it('renders correctly', () => {
  const tree = renderer
    .create(<Pannel>Stuff</Pannel>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});