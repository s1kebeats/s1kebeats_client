import refresh from './refresh';
import { Mock, beforeEach, describe, expect, test, vi } from 'vitest';
import axios from 'axios';
import { AuthResponseBodyMock } from '@/mocks/responseBodies';

vi.mock('axios');

describe('refresh', () => {
  beforeEach(() => {
    (axios.post as Mock).mockReset();
    vi.clearAllMocks();
  });

  test('should call axios.post with valid params', async () => {
    await refresh();
    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      process.env.API_URL + '/refresh',
      null,
      {
        withCredentials: true,
      }
    );
  });
  test('should return response', async () => {
    (axios.post as Mock).mockResolvedValue(AuthResponseBodyMock);
    const response = await refresh();
    expect(response).toBe(AuthResponseBodyMock);
  });
});
