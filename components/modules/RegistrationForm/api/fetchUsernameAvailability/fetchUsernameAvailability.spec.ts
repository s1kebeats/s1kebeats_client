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
import { RuntimeConfigMock } from '@/mocks';

vi.mock('axios');
vi.stubGlobal('useRuntimeConfig', () => RuntimeConfigMock);

describe('fetchUsernameAvailability', () => {
  beforeEach(() => {
    (axios.get as Mock).mockResolvedValue({
      data: {
        available: false,
      },
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('should call axios.get with valid params', async () => {
    const testUsername = 'testUsername';
    await fetchUsernameAvailability(testUsername);
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(
      `${RuntimeConfigMock.public.API_URL}/checkusername/${testUsername}`
    );
  });
  test('should return username availabity', async () => {
    const availabity = await fetchUsernameAvailability('username');
    expect(availabity).toBe(false);
  });
});
