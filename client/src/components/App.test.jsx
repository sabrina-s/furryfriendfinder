import React from 'react';
import { cleanup, render, wait } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

test('renders app header', async () => {
  fetch.mockResponse((req) => {
    if (req === 'http://localhost:5000/api/dogs') {
      return Promise.resolve(JSON.stringify([]));
    }
    if (req === 'http://localhost:5000/api/users/me') {
      return Promise.resolve(JSON.stringify({}));
    }
    return Promise.resolve(JSON.stringify([]));
  });

  const { getByText } = render(<App />);

  await wait();
  const headerElement = getByText('Furry Friend Finder');
  expect(headerElement).toBeInTheDocument();
});
