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
    (axios.get as Mock).mockClear();
  });
  test('should call axios.post with valid params', async () => {
    const testUsername = 'testUsername';
    await fetchUsernameAvailability(testUsername);
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(
      `${runtimeConfigMock.public.API_URL}/checkusername/${testUsername}`
    );
  });
  test('should return username availabity', async () => {
    const availabity = await fetchUsernameAvailability('username');
    expect(availabity).toBe(false);
  });
});
