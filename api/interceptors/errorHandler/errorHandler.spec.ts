import { describe, it, expect, vi, beforeEach } from 'vitest';
import errorHandler from './errorHandler';
import refreshAccessToken from '../refreshAccessToken';

vi.mock('../refreshAccessToken');

describe('errorHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should call refreshAccessToken with provided error if error.response.status is 401', async () => {
    const testError = {
      config: {},
      response: {
        status: 401,
      },
    };
    await errorHandler(testError);
    expect(refreshAccessToken).toHaveBeenCalled();
    expect(refreshAccessToken).toHaveBeenCalledWith(testError);
  });
  it('should throw provided error without calling refreshAccessToken if error.response.status is not 401', async () => {
    const testError = {
      config: {},
      response: {
        status: 500,
      },
    };
    try {
      await errorHandler(testError);
    } catch (error) {
      expect(refreshAccessToken).not.toHaveBeenCalled();
      expect(error).toBe(testError);
    }
  });
});
