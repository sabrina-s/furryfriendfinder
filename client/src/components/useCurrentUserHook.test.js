import { renderHook } from '@testing-library/react-hooks';

import { useCurrentUserHook } from './useCurrentUserHook';

beforeEach(() => {
  fetch.resetMocks();
});

describe('useCurrentUserHook', () => {
  it('returns current user', async () => {
    const user = { username: 'amanda' };
    fetch.mockResponseOnce(JSON.stringify(user));

    const { result, waitForNextUpdate } = renderHook(() => useCurrentUserHook());

    await waitForNextUpdate();
    expect(result.current.currentUser).toEqual(user);
  });
});
