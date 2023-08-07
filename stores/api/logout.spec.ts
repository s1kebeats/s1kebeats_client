import logout from './logout';
import { Mock, beforeEach, describe, expect, test, vi } from 'vitest';
import axios from 'axios';
import { runtimeConfigMock } from './mocks';

vi.stubGlobal('useRuntimeConfig', () => runtimeConfigMock);

vi.mock('axios');

describe('logout', () => {
  beforeEach(() => {
    (axios.post as Mock).mockReset();
    vi.clearAllMocks();
  });

  test('should call axios.post with valid params', async () => {
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
    (axios.post as Mock).mockResolvedValue(responseMock);
    const response = await logout();
    expect(response).toBe(responseMock);
  });
});
