import login from './login';
import { Mock, beforeEach, describe, expect, test, vi } from 'vitest';
import axios from 'axios';
import { LoginRequestBodyMock } from '@/mocks/requestBodies';
import { AuthResponseMock } from '@/mocks/responses';
import { RuntimeConfigMock } from '@/mocks';

vi.mock('axios');
vi.stubGlobal('useRuntimeConfig', () => RuntimeConfigMock)

describe('login', () => {
  beforeEach(() => {
    (axios.post as Mock).mockReset();
    vi.clearAllMocks();
  });

  test('should call axios.post with valid params', async () => {
    await login(LoginRequestBodyMock);
    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      RuntimeConfigMock.public.API_URL + '/login',
      LoginRequestBodyMock,
      { withCredentials: true }
    );
  });
  test('should return response', async () => {
    (axios.post as Mock).mockResolvedValue(AuthResponseMock);
    const response = await login(LoginRequestBodyMock);
    expect(response).toBe(AuthResponseMock);
  });
});
