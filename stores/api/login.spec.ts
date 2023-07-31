import login from './login';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import axios from 'axios';
import { runtimeConfigMock } from './mocks';

vi.stubGlobal('useRuntimeConfig', () => runtimeConfigMock);

vi.mock('axios');

describe('login', () => {
  beforeEach(() => {
    axios.post.mockReset();
  });

  test('should make post request to api with valid params', async () => {
    await login('username', 'password', false);
    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      runtimeConfigMock.public.API_URL + '/login',
      { username: `username`, password: 'password', refresh: false },
      { withCredentials: true }
    );
  });
  test('should return response', async () => {
    const responseMock = {
      data: 'success',
    };
    axios.post.mockResolvedValue(responseMock);
    const response = await login('username', 'password', false);
    expect(response).toStrictEqual(responseMock);
  });
});
