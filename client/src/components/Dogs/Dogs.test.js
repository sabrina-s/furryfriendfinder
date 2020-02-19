import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Dogs from './Dogs';

afterEach(cleanup);

test('renders dog cards', () => {
  const { container } = render(<Dogs/>);
  expect(container.firstChild.className).toEqual('cards');
});
