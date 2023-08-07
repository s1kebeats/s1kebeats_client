import setAuthHeader from './setAuthHeader';
import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';

const testTokenFromLocalStorage = 'testToken';
const localStorageMock = (function () {
  const store = {
    accessToken: testTokenFromLocalStorage,
  };
  return {
    getItem: vi.fn(function (key: keyof typeof store) {
      return store[key];
    }),
  };
})();

describe('setAuthHeader', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should define config.headers if was not provided in config', () => {
    const config = setAuthHeader({});
    expect(Object.keys(config)).toContain('headers');
  });
  it('should return config object', () => {
    expect(typeof setAuthHeader({})).toBe('object');
  });
  it('should get accessToken from localStorage', () => {
    setAuthHeader({});
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.getItem).toHaveBeenCalledWith('accessToken');
  });
  it('should set config.headers.Authorization to valid token string', () => {
    const config = setAuthHeader({});
    expect(config.headers!.Authorization).toBe(
      `Bearer ${testTokenFromLocalStorage}`
    );
  });
});
