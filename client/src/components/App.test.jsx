import React from 'react';
import { render, wait } from '@testing-library/react';

import * as useCurrentUserHook from './useCurrentUserHook';
import App from './App';

describe('App', () => {
  let useCurrentUserSpy;
  let currentUser;
  let setCurrentUser;

  beforeEach(() => {
    setCurrentUser = jest.fn();
    currentUser = {
      username: 'Sabrina'
    };
    useCurrentUserSpy = jest.spyOn(useCurrentUserHook, 'useCurrentUserHook');

    // eslint-disable-next-line max-len
    // TODO: Below mock be removed after extracting the useEffect hook in the Dog component to a custom hook and mock it like the useCurrentUserHook. Makes testing alot easier when you can spy and stub return values
    fetch.mockResponseOnce(JSON.stringify([]));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('sets current user to userContext', async () => {
    useCurrentUserSpy.mockReturnValue({ currentUser, setCurrentUser });

    const { queryByText } = render(<App />);

    await wait();
    expect(queryByText(currentUser.username)).not.toBeNull();
  });
});
