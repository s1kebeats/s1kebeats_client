import register from './register';
import { Mock, beforeEach, describe, expect, test, vi } from 'vitest';
import axios from 'axios';
import { RegisterRequestBodyMock } from '@/mocks/requestBodies';
import { RegisterResponseMock } from '@/mocks/responses';

vi.mock('axios');

describe('register', () => {
  beforeEach(() => {
    (axios.post as Mock).mockClear();
  });

  test('should call axios.post with valid params', async () => {
    await register(RegisterRequestBodyMock);
    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      process.env.API_URL + '/register',
      RegisterRequestBodyMock
    );
  });
  test('should return axios.post response', async () => {
    (axios.post as Mock).mockResolvedValue(RegisterResponseMock);
    const response = await register(RegisterRequestBodyMock);
    expect(response).toBe(RegisterResponseMock);
  });
});
