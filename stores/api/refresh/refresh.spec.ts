import refresh from './refresh';
import { Mock, beforeEach, describe, expect, test, vi } from 'vitest';
import axios from 'axios';
import { AuthResponseMock } from '@/mocks/responses';
import { RuntimeConfigMock } from '@/mocks';

vi.mock('axios');
vi.stubGlobal('useRuntimeConfig', () => RuntimeConfigMock);

describe('refresh', () => {
  beforeEach(() => {
    (axios.post as Mock).mockReset();
    vi.clearAllMocks();
  });

  test('should call axios.post with valid params', async () => {
    await refresh();
    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      RuntimeConfigMock.public.API_URL + '/refresh',
      null,
      {
        withCredentials: true,
      }
    );
  });
  test('should return response', async () => {
    (axios.post as Mock).mockResolvedValue(AuthResponseMock);
    const response = await refresh();
    expect(response).toBe(AuthResponseMock);
  });
});
