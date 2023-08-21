import $api from '@/api';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import setAuthHeader from './interceptors/setAuthHeader';
import errorHandler from './interceptors/errorHandler';
import returnResponse from './interceptors/returnResponse';

describe('$api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe('config', () => {
    it('should have withCredentials option set to "true"', () => {
      expect($api.defaults.withCredentials).toBe(true);
    });
    it('should have baseUrl option set to .env API_URL', () => {
      expect($api.defaults.baseURL).toBe(process.env.API_URL);
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
