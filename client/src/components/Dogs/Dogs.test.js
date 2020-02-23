import React from 'react';
import { wait } from '@testing-library/dom';
import { render } from '@testing-library/react';
import Dogs from './Dogs';

beforeEach(() => {
  fetch.resetMocks();
});

test('renders dog cards', async () => {
  const fakeDog = {
      _id: 1,
      available: false,
      name: 'Bernie',
      gender: 'male',
      description: 'Bernie is shy at first but quickly warms up to people. Once he is comfortable, he can be playful. He is extremely food-driven.',
      hdbApproved: true
  };

  fetch.mockResponseOnce(JSON.stringify([fakeDog]), { headers: { 'content-type': 'application/json' } });

  const { getByText } = render(<Dogs />);

  await wait(() => [
    expect(getByText(fakeDog.name)).toBeInTheDocument(),
    expect(getByText("Male")).toBeInTheDocument(),
    expect(getByText(fakeDog.description)).toBeInTheDocument(),
    expect(getByText("HDB approved")).toBeInTheDocument()
  ]);
});
