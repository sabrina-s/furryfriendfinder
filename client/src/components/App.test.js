import React from 'react';
import { render, cleanup } from '@testing-library/react'
import App from './App';

afterEach(cleanup);

test('renders app header', () => {
  const { getByText } = render(<App/>);
  const headerElement = getByText(/Furry Friend Finder/i);
  expect(headerElement).toBeInTheDocument();
});
