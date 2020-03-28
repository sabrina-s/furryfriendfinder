import React from 'react';
import {
  render,
  fireEvent,
  wait
} from '@testing-library/react';
import * as Router from 'react-router-dom';
import SettingsPage from './SettingsPage';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn()
}));

afterEach(() => {
  jest.resetAllMocks();
  fetch.resetMocks();
});

test('shows form inputs for password', async () => {
  const { getByPlaceholderText } = render(<SettingsPage
    history={[]}
  />);

  expect(getByPlaceholderText('Password')).toBeInTheDocument();
  await wait();
});

test('sets currentUser and navigates to dashboard when registration is successful', async () => {
  const addHistory = jest.fn();

  jest.spyOn(Router, 'useHistory').mockReturnValue({
    push: addHistory
  });

  const { getByRole, getByPlaceholderText } = render(<SettingsPage
    history={[]}
  />);

  const submit = getByRole('button');
  const password = getByPlaceholderText('Password');

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
});
