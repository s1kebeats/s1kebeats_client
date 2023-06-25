import fetchUsernameAvailability from './fetchUsernameAvailability';
import {
  Mock,
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest';
import axios from 'axios';
import { runtimeConfigMock } from '@/stores/api/mocks';

vi.stubGlobal('useRuntimeConfig', () => runtimeConfigMock);

vi.mock('axios');

describe('fetchUsernameAvailability', () => {
  beforeEach(() => {
    (axios.get as Mock).mockResolvedValue({
      data: {
        available: false,
      },
    });
  });
  afterEach(() => {
    (axios.get as Mock).mockReset();
  });
  test('should make post request to api with valid params', async () => {
    await fetchUsernameAvailability('username');
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(
      `${runtimeConfigMock.public.API_URL}/checkusername/username`
    );
  });
  test('should return valid username availabity', async () => {
    const availabity = await fetchUsernameAvailability('username');
    expect(availabity).toBeFalsy();
  });
});
