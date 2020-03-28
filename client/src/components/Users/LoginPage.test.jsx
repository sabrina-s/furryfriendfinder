import React from 'react';
import {
  render,
  fireEvent,
  wait
} from '@testing-library/react';
import * as Router from 'react-router-dom';
import LoginPage from './LoginPage';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn()
}));

afterEach(() => {
  jest.resetAllMocks();
  fetch.resetMocks();
});

test('shows form inputs for username and password', async () => {
  const { getByPlaceholderText } = render(<LoginPage />);

  expect(getByPlaceholderText('Username')).toBeInTheDocument();
  expect(getByPlaceholderText('Password')).toBeInTheDocument();
  await wait();
});

test('sets currentUser and navigates to dashboard when login is successful', async () => {
  const addHistory = jest.fn();
  const setCurrentUser = jest.fn();
  const user = {
    _id: 1,
    username: 'username'
  };

  jest.spyOn(Router, 'useHistory').mockReturnValue({
    push: addHistory
  });

  fetch.mockResponseOnce(JSON.stringify({ user }));

  const { getByRole, getByPlaceholderText } = render(<LoginPage setCurrentUser={setCurrentUser} />);
  const submit = getByRole('button');
  const username = getByPlaceholderText('Username');
  const password = getByPlaceholderText('Password');

  await wait(() => {
    fireEvent.change(username, {
      target: {
        value: 'mock@username.com'
      }
    });
  });

  await wait(() => {
    fireEvent.change(password, {
      target: {
        value: 'password'
      }
    });
  });

  await wait(() => {
    fireEvent.click(submit);
  });

  expect(addHistory).toHaveBeenCalledWith('/');
  expect(setCurrentUser).toHaveBeenCalledWith(user);
});
