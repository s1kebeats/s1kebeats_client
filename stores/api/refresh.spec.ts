import refresh from './refresh';
import { Mock, beforeEach, describe, expect, test, vi } from 'vitest';
import axios from 'axios';
import { runtimeConfigMock } from './mocks';

vi.stubGlobal('useRuntimeConfig', () => runtimeConfigMock);

vi.mock('axios');

describe('refresh', () => {
  beforeEach(() => {
    (axios.post as Mock).mockReset();
  });

  test('should call axios.post with valid params', async () => {
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
    (axios.post as Mock).mockResolvedValue(responseMock);
    const response = await refresh();
    expect(response).toBe(responseMock);
  });
});
