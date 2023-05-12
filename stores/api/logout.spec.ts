import logout from './logout';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import axios from 'axios';
import { runtimeConfigMock } from './mocks';

vi.stubGlobal('useRuntimeConfig', () => runtimeConfigMock);

vi.mock('axios');

describe('logout', () => {
  beforeEach(() => {
    axios.post.mockReset()
  })

  test('should make post request to api with valid params', async () => {
    await logout();
    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      runtimeConfigMock.public.API_URL + '/logout',
      null,
      {
        withCredentials: true,
      }
    );
  });
  test('should return response', async () => {
    const responseMock = {
      data: 'success',
    };
    axios.post.mockResolvedValue(responseMock);
    const response = await logout();
    expect(response).toStrictEqual(responseMock);
  });
});
