import returnResponse from './returnResponse';
import { describe, it, expect } from 'vitest';
import { type AxiosResponse } from 'axios';

describe('returnResponse', () => {
  it('should return provided reponse', () => {
    const testRequest = { someField: 'test' };
    expect(returnResponse(testRequest as unknown as AxiosResponse)).toBe(
      testRequest
    );
  });
});
