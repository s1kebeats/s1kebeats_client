import login from './login';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const axiosPost = vi.fn();

vi.mock('axios', () => {
  return {
    default: {
      post: axiosPost,
    },
  };
});

describe('login', () => {
  test('should make post api request with valid params', () => {
    login('s1kebeats', 'password', false);
    expect(axiosPost).toHaveBeenCalled();
    expect(axiosPost).toHaveBeenCalledWith(
      '/login',
      { username: `/s1kebeats`, password: 'password', refresh: false },
      { withCredentials: true }
    );
  });
});
