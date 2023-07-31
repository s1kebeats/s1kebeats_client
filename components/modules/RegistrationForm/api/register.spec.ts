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
    await register('username', 'email', 'password');
    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      runtimeConfigMock.public.API_URL + '/register',
      {
        username: 'username',
        email: 'email',
        password: 'password',
      }
    );
  });
  test('should return response', async () => {
    const responseMock = {
      data: 'success',
    };
    (axios.post as Mock).mockResolvedValue(responseMock);
    const response = await register('username', 'email', 'password');
    expect(response).toStrictEqual(responseMock);
  });
});
