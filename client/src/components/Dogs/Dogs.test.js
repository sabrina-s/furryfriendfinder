import React from 'react';
import { act } from 'react-dom/test-utils';
import { wait } from '@testing-library/dom';
import { render } from '@testing-library/react';
import Dogs from './Dogs';

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
  ];

  fetch.mockResponseOnce(JSON.stringify(fakeDogs), { headers: { 'content-type': 'application/json' } });

  let container;

  act(() => {
    container = render(<Dogs />);
  })

  const { queryAllByText } = container;

  const bernies = await wait(() => queryAllByText(/Bernie/i).length > 0)

  const bernie = queryAllByText(/Bernie/i)[0];

  expect(bernie).toBeInTheDocument();
});
