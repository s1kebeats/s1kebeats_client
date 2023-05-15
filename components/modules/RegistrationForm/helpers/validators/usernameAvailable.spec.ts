import usernameAvailable from './usernameAvailable';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import fetchUsernameAvailability from '../../api/fetchUsernameAvailability';

vi.mock('../../api/fetchUsernameAvailability');

describe('usernameAvailable', () => {
  beforeEach(() => {
    fetchUsernameAvailability.mockReset();
  });

  test('should return fetchUsernameAvailability value', async () => {
    const availability = await usernameAvailable('username');
    fetchUsernameAvailability.mockResolvedValue(true);
    expect(fetchUsernameAvailability).toHaveBeenCalled();
    expect(fetchUsernameAvailability).toHaveBeenCalledWith('username');
    expect(availability).toBe(true);
  });
  test('should return fetchUsernameAvailability value', async () => {
    const availability = await usernameAvailable('username');
    fetchUsernameAvailability.mockResolvedValue(false);
    expect(fetchUsernameAvailability).toHaveBeenCalled();
    expect(fetchUsernameAvailability).toHaveBeenCalledWith('username');
    expect(availability).toBe(false);
  });
});
