import register from './register';
import { Mock, beforeEach, describe, expect, test, vi } from 'vitest';
import axios from 'axios';
import { RegisterRequestBodyMock } from '@/mocks/requestBodies';
import { RegisterResponseMock } from '@/mocks/responses';
import { RuntimeConfigMock } from '@/mocks';

vi.mock('axios');
vi.stubGlobal('useRuntimeConfig', () => RuntimeConfigMock);

describe('register', () => {
  beforeEach(() => {
    (axios.post as Mock).mockClear();
  });

  test('should call axios.post with valid params', async () => {
    await register(RegisterRequestBodyMock);
    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      RuntimeConfigMock.public.API_URL + '/register',
      RegisterRequestBodyMock
    );
  });
  test('should return axios.post response', async () => {
    (axios.post as Mock).mockResolvedValue(RegisterResponseMock);
    const response = await register(RegisterRequestBodyMock);
    expect(response).toBe(RegisterResponseMock);
  });
});
