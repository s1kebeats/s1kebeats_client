import usernameAvailable from './usernameAvailable';
import { describe, expect, test, vi } from 'vitest';
import { fetchUsernameAvailability } from '@/components/modules/RegistrationForm/api';

vi.mock('@/components/modules/RegistrationForm/api', () => {
  return {
    fetchUsernameAvailability: vi.fn(() => {
      return true;
    }),
  };
});

describe('usernameAvailable', () => {
  test('should call fetchUsernameAvailability', async () => {
    const availability = await usernameAvailable('username');
    expect(fetchUsernameAvailability).toHaveBeenCalled();
    expect(fetchUsernameAvailability).toHaveBeenCalledWith('username');
    expect(availability).toBe(true);
  });
  test('should return fetchUsernameAvailability value', async () => {
    const availability = await usernameAvailable('username');
    expect(availability).toBe(true);
  });
});
