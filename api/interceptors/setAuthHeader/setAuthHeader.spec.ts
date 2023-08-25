import { LocalStorageMock } from '@/mocks';
import setAuthHeader from './setAuthHeader';
import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';

describe('setAuthHeader', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', { value: LocalStorageMock });
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should define config.headers if was not present in provided config', () => {
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
    const testToken = 'testToken';
    localStorage.setItem('accessToken', testToken);
    const config = setAuthHeader({});
    expect(config.headers!.Authorization).toBe(`Bearer ${testToken}`);
  });
});
