import login from './login';
import { Mock, beforeEach, describe, expect, test, vi } from 'vitest';
import axios from 'axios';
import { runtimeConfigMock } from './mocks';

vi.stubGlobal('useRuntimeConfig', () => runtimeConfigMock);

vi.mock('axios');

describe('login', () => {
  beforeEach(() => {
    (axios.post as Mock).mockReset();
    vi.clearAllMocks();
  });

  test('should call axios.post with valid params', async () => {
    const testData = {
      username: 'username',
      password: 'password',
      refresh: false,
    };
    await login(testData.username, testData.password, testData.refresh);
    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      runtimeConfigMock.public.API_URL + '/login',
      testData,
      { withCredentials: true }
    );
  });
  test('should return response', async () => {
    const responseMock = {
      data: 'success',
    };
    (axios.post as Mock).mockResolvedValue(responseMock);
    const response = await login('username', 'password', false);
    expect(response).toBe(responseMock);
  });
});
