import refresh from '@/stores/api/refresh';
import refreshAccessToken from './refreshAccessToken';
import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';
import { runtimeConfigMock } from '@/stores/api/mocks';
import $api from '@/api';

const testAccessToken = 'testAccessToken';

const { mockedMethod } = vi.hoisted(() => {
  return {
    mockedMethod: vi.fn(() => {
      return {
        data: {
          accessToken: testAccessToken,
        },
      };
    }),
  };
});

vi.mock('@/stores/api/refresh', () => {
  return { default: mockedMethod };
});
vi.mock('@/api');

vi.stubGlobal('useRuntimeConfig', () => runtimeConfigMock);
const localStorageMock = (function () {
  return {
    getItem: vi.fn(),
    setItem: vi.fn(),
  };
})();

describe('refreshAccessToken', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should call refresh function', async () => {
    await refreshAccessToken({
      config: {},
      response: {
        status: 401,
      },
    });
    expect(refresh).toHaveBeenCalled();
  });
  it('should save received accessToken to localStorage', async () => {
    await refreshAccessToken({
      config: {},
      response: {
        status: 401,
      },
    });
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'accessToken',
      testAccessToken
    );
  });
  it('should call $api.request with previous request (error.config)', async () => {
    const testConfig = {
      url: '/api/v1/test',
    };
    await refreshAccessToken({
      config: testConfig,
      response: {
        status: 401,
      },
    });
    expect($api.request).toHaveBeenCalledWith(testConfig);
  });
});
