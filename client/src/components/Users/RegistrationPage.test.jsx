import React from 'react';
import {
  render,
  fireEvent,
  wait,
} from '@testing-library/react';
import * as Router from 'react-router-dom';
import RegistrationPage from './RegistrationPage';
import { REGISTER_API } from '../../api';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}));

afterEach(() => {
  fetch.resetMocks();
});

test('shows form inputs for username and password', async () => {
  const { getByPlaceholderText } = render(<RegistrationPage history={[]} />);

  expect(getByPlaceholderText('Username')).toBeInTheDocument();
  expect(getByPlaceholderText('Password')).toBeInTheDocument();
  await wait();
});

test('navigates to dashboard when registration is successful', async () => {
  const addHistory = jest.fn();
  jest.spyOn(Router, 'useHistory').mockReturnValue({
    push: addHistory,
  });
  fetch.mockResponseOnce((req) => {
    if (req.url === REGISTER_API) {
      return Promise.resolve({});
    }
    return Promise.reject();
  });

  const { getByRole, getByPlaceholderText } = render(<RegistrationPage />);
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

  expect(addHistory).toHaveBeenCalledWith('/');
});
