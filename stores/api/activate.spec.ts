import activate from './activate';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import axios from 'axios';
import { runtimeConfigMock } from './mocks';

vi.stubGlobal('useRuntimeConfig', () => runtimeConfigMock);

vi.mock('axios');

describe('activate', () => {
  beforeEach(() => {
    axios.post.mockReset();
  });

  test('should make post request to api with valid params', async () => {
    const testCode = 'testCode';
    await activate(testCode);
    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      runtimeConfigMock.public.API_URL + '/activate' + '/' + testCode
    );
  });
  test('should return response', async () => {
    const responseMock = {
      data: 'success',
    };
    axios.post.mockResolvedValue(responseMock);
    const response = await activate('testCode');
    expect(response).toStrictEqual(responseMock);
  });
});
