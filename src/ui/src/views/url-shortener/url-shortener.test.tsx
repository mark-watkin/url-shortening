import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Url } from '../../models/ulr';
import { UrlShorener } from '../url-shortener';

afterEach(() => {
  jest.restoreAllMocks();
});

it('Should render all previously added shortened urls', async () => {
  const mockResponse: Url[] = [{ id: 1, original: 'original1', shortened: 'shortened1' }, { id: 2, original: 'original2', shortened: 'shortened2' }];
  jest.spyOn(global, 'fetch').mockResolvedValue(
    new Response(JSON.stringify(mockResponse), { status: 200, statusText: 'OK' }))

  const { getByText } = render(<UrlShorener />);

  await waitFor(() => {
    mockResponse.forEach(m => {
        const primaryText = getByText(m.shortened);
        expect(primaryText).toBeInTheDocument();
        const secondaryText = getByText(m.original);
        expect(secondaryText).toBeInTheDocument();
    });
  });
});

it('Should allow the addition of new shortened urls', async () => {
  const submitResponse: Url = { id: 2, original: 'https://google.com', shortened: 'https://pbid.io/12345678' };
  const initialLoadResponse: Url[] = [{ id: 1, original: 'original1', shortened: 'shortened1' }];
  
  jest.spyOn(global, 'fetch')
    .mockResolvedValueOnce(
      new Response(JSON.stringify(initialLoadResponse), { status: 200, statusText: 'OK' }))
    .mockResolvedValueOnce(
      new Response(JSON.stringify(submitResponse), { status: 201, statusText: 'CREATED' }))

  const { getByText, getByPlaceholderText } = render(<UrlShorener />);

  await waitFor(() => {
    const existingItem = getByText('shortened1');
    expect(existingItem).toBeInTheDocument();
  });

  const input = getByPlaceholderText('Enter a url to shorten!');
  fireEvent.change(input, {target: {value: 'https://google.com'}})
  fireEvent.click(getByText("Submit"));

  await waitFor(() => {
    const primaryText = getByText(submitResponse.shortened);
    expect(primaryText).toBeInTheDocument();
    const secondaryText = getByText(submitResponse.original);
    expect(secondaryText).toBeInTheDocument();
  });
});

