import React from 'react';
import { render, cleanup } from '@testing-library/react'
import { act } from 'react-dom/test-utils';
import App from './App';

afterEach(cleanup);

test('renders app header', () => {

  fetch.mockResponseOnce(JSON.stringify([]), {headers: { 'content-type': 'application/json' }});

  let container;
  act(() => {
    container = render(<App/>);
  });

  const headerElement = container.getByText(/Furry Friend Finder/i);
  expect(headerElement).toBeInTheDocument();
});
