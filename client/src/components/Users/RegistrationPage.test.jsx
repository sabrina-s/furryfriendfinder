import React from 'react';
import {
  render,
  fireEvent,
  wait
} from '@testing-library/react';
import * as Router from 'react-router-dom';
import RegistrationPage from './RegistrationPage';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn()
}));

afterEach(() => {
  jest.resetAllMocks();
  fetch.resetMocks();
});

test('shows form inputs for username, password, and confirmPassword', async () => {
  const setCurrentUser = jest.fn();
  const { getByPlaceholderText } = render(<RegistrationPage
    setCurrentUser={setCurrentUser}
    history={[]}
  />);

  expect(getByPlaceholderText('Username')).toBeInTheDocument();
  expect(getByPlaceholderText('Password')).toBeInTheDocument();
  expect(getByPlaceholderText('Confirm password')).toBeInTheDocument();
  await wait();
});

test('sets currentUser and navigates to dashboard when registration is successful', async () => {
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

  const { getByRole, getByPlaceholderText } = render(<RegistrationPage
    setCurrentUser={setCurrentUser}
    history={[]}
  />);

  const submit = getByRole('button');
  const username = getByPlaceholderText('Username');
  const password = getByPlaceholderText('Password');
  const confirmPassword = getByPlaceholderText('Confirm password');

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
    fireEvent.change(confirmPassword, {
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
