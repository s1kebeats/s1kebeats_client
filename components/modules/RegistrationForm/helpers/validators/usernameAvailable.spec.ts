import usernameAvailable from './usernameAvailable';
import { describe, expect, test, vi } from 'vitest';
import fetchUsernameAvailability from '../../api/fetchUsernameAvailability';

vi.mock('../../api/fetchUsernameAvailability', () => {
  return {
    default: () => {
      return true;
    },
  };
});

describe('usernameAvailable', () => {
  test('should call fetchUsernameAvailability and return its value', async () => {
    const availability = await usernameAvailable('username');
    expect(fetchUsernameAvailability).toHaveBeenCalled();
    expect(fetchUsernameAvailability).toHaveBeenCalledWith('username');
    expect(availability).toBe(true);
  });
});
