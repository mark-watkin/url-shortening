import renderer from 'react-test-renderer';
import { Form } from './form';

it('renders correctly when in error', () => {
  const tree = renderer
    .create(<Form 
        inputHint="Enter a url to shorten!" 
        submitText="Submit" 
        invalidText="The url that you have entered is not valid. Dont forget to include the protocol!"
        isInvalid={true}
        onSubmit={() => Promise.resolve(0)}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when not in error', () => {
    const tree = renderer
      .create(<Form 
          inputHint="Enter a url to shorten!" 
          submitText="Submit" 
          invalidText="The url that you have entered is not valid. Dont forget to include the protocol!"
          isInvalid={false}
          onSubmit={() => Promise.resolve(0)}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});