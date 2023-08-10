import register from './register';
import { Mock, beforeEach, describe, expect, test, vi } from 'vitest';
import axios from 'axios';
import { runtimeConfigMock } from '@/stores/api/mocks';

vi.stubGlobal('useRuntimeConfig', () => runtimeConfigMock);

vi.mock('axios');

describe('register', () => {
  beforeEach(() => {
    (axios.post as Mock).mockReset();
  });

  test('should make post request to api with valid params', async () => {
    const testData = {
      username: 'username',
      email: 'test@example.com',
      password: 'password',
    };
    await register(testData.username, testData.email, testData.password);
    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      runtimeConfigMock.public.API_URL + '/register',
      testData
    );
  });
  test('should return response', async () => {
    const responseMock = {
      data: 'success',
    };
    (axios.post as Mock).mockResolvedValue(responseMock);
    const response = await register('username', 'email', 'password');
    expect(response).toBe(responseMock);
  });
});
