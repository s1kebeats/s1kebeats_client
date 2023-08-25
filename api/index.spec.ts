import $api from '@/api';
import { API_URL } from '@/nuxt.config';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { returnResponse, errorHandler, setAuthHeader } from './interceptors';
import { RuntimeConfigMock } from '@/mocks';

vi.stubGlobal('useRuntimeConfig', () => RuntimeConfigMock);
vi.mock('@/nuxt.config', () => {
  return {
    API_URL: 'api_url',
  };
});

describe('$api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe('config', () => {
    it('should have withCredentials option set to "true"', () => {
      expect($api.defaults.withCredentials).toBe(true);
    });
    it('should have baseUrl option set to API_URL', () => {
      expect($api.defaults.baseURL).toBe(API_URL);
    });
  });
  // Axios has an issue with "handlers" typings: https://github.com/axios/axios/pull/5551
  describe('interceptors', () => {
    it('should have setAuthHeader present inside request fulfilled interceptors', () => {
      expect($api.interceptors.request.handlers[0]['fulfilled']).toBe(
        setAuthHeader
      );
    });
    it('should have returnResponse present inside response fulfilled interceptors', () => {
      expect($api.interceptors.response.handlers[0]['fulfilled']).toBe(
        returnResponse
      );
    });
    it('should have errorHandler present inside response rejected interceptors', () => {
      expect($api.interceptors.response.handlers[0]['rejected']).toBe(
        errorHandler
      );
    });
  });
});
