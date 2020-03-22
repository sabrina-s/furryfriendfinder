import React from 'react';
import {
  render,
  fireEvent,
  wait,
} from '@testing-library/react';
import LoginPage from './LoginPage';

afterEach(() => {
  fetch.resetMocks();
});

test('shows form inputs for username and password', async () => {
  const { getByPlaceholderText } = render(<LoginPage history={[]} />);

  expect(getByPlaceholderText('Username')).toBeInTheDocument();
  expect(getByPlaceholderText('Password')).toBeInTheDocument();
  await wait();
});

test('navigates to dashboard when login is successful', async () => {
  const history = [];
  fetch.mockResponseOnce((req) => {
    if (req.url === 'http://localhost:5000/api/users/login') {
      return Promise.resolve({});
    }
    return Promise.reject();
  });

  const { getByRole, getByPlaceholderText } = render(<LoginPage history={history} />);
  const submit = getByRole('button');
  const username = getByPlaceholderText('Username');
  const password = getByPlaceholderText('Password');

  await wait(() => {
    fireEvent.change(username, {
      target: {
        value: 'mock@username.com',
      },
    });
  });

  await wait(() => {
    fireEvent.change(password, {
      target: {
        value: 'password',
      },
    });
  });

  await wait(() => {
    fireEvent.click(submit);
  });

  expect(history).toEqual(['/']);
});
