import refresh from './refresh';
import { describe, expect, test, vi } from 'vitest';
import axios from 'axios';
import { runtimeConfigMock } from './mocks';

vi.stubGlobal('useRuntimeConfig', () => runtimeConfigMock);

vi.mock('axios');

describe('refresh', () => {
  test('should make post request to api with valid params', async () => {
    await refresh();
    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      runtimeConfigMock.public.API_URL + '/refresh',
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
    const response = await refresh();
    expect(response).toStrictEqual(responseMock);
  });
});
