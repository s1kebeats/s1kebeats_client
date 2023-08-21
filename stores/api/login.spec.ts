import login from './login';
import { Mock, beforeEach, describe, expect, test, vi } from 'vitest';
import axios from 'axios';
import { LoginRequestBodyMock } from '@/mocks/requestBodies';

vi.mock('axios');

describe('login', () => {
  beforeEach(() => {
    (axios.post as Mock).mockReset();
    vi.clearAllMocks();
  });

  test('should call axios.post with valid params', async () => {
    await login(LoginRequestBodyMock);
    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      process.env.API_URL + '/login',
      LoginRequestBodyMock,
      { withCredentials: true }
    );
  });
  test('should return response', async () => {
    const responseMock = {
      data: 'success',
    };
    (axios.post as Mock).mockResolvedValue(responseMock);
    const response = await login(LoginRequestBodyMock);
    expect(response).toBe(responseMock);
  });
});
