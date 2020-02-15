import React from 'react';
// import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { render, cleanup } from '@testing-library/react';
import Dogs from './Dogs';
// afterEach(cleanup);

beforeEach(() => {
  fetch.resetMocks();
});

test('renders dog cards', async () => {
  const fakeDogs = [
    {
      _id: 1,
      available: false,
      name: 'Bernie',
      gender: 'male',
      description: 'Bernie is shy at first but quickly warms up to people. Once he is comfortable, he can be playful. He is extremely food-driven.',
      hdbApproved: true
    }
  ]

  fetch.mockResponseOnce(JSON.stringify(fakeDogs));

  let container;

  act(() => {
    container = render(<Dogs/>);
  });

  expect(container.firstChild.classList.contains('cards')).toBe(true);
});
