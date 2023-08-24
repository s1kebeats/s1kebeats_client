import activate from './activate';
import { Mock, beforeEach, describe, expect, test, vi } from 'vitest';
import axios from 'axios';
import { ActivateResponseMock } from '@/mocks/responses';
import { RuntimeConfigMock } from '@/mocks';

vi.mock('axios');
vi.stubGlobal('useRuntimeConfig', () => RuntimeConfigMock)

describe('activate', () => {
  beforeEach(() => {
    (axios.post as Mock).mockReset();
    vi.clearAllMocks();
  });

  test('should call axios.post with valid params', async () => {
    const testCode = 'testCode';
    await activate(testCode);
    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      RuntimeConfigMock.public.API_URL + '/activate/' + testCode
    );
  });
  test('should return response', async () => {
    (axios.post as Mock).mockResolvedValue(ActivateResponseMock);
    const response = await activate('testCode');
    expect(response).toBe(ActivateResponseMock);
  });
});
