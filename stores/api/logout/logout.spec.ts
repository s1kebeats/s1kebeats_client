import logout from './logout';
import { Mock, beforeEach, describe, expect, test, vi } from 'vitest';
import axios from 'axios';
import { LogoutResponseMock } from '@/mocks/responses';
import { RuntimeConfigMock } from '@/mocks';

vi.mock('axios');
vi.stubGlobal('useRuntimeConfig', () => RuntimeConfigMock);

describe('logout', () => {
  beforeEach(() => {
    (axios.post as Mock).mockReset();
    vi.clearAllMocks();
  });

  test('should call axios.post with valid params', async () => {
    await logout();
    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      RuntimeConfigMock.public.API_URL + '/logout',
      null,
      {
        withCredentials: true,
      }
    );
  });
  test('should return response', async () => {
    (axios.post as Mock).mockResolvedValue(LogoutResponseMock);
    const response = await logout();
    expect(response).toBe(LogoutResponseMock);
  });
});
