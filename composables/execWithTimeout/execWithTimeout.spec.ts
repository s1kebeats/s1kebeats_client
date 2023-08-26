import execWithTimeout from './execWithTimeout';
import { describe, it, expect } from 'vitest';

describe('execWithTimeout', () => {
  // +- 50 ms to prevent test failures due to pc timings
  it('timeout longer that cb - should return after timeout', async () => {
    const start = Date.now();
    await execWithTimeout(
      new Promise((resolve) => {
        setTimeout(resolve, 100);
      }),
      400
    );
    const end = Date.now();
    const duration = end - start;
    expect(duration > 350).toBe(true);
    expect(duration < 450).toBe(true);
  });
  it('cb longer that timeout - should return after cb', async () => {
    const start = Date.now();
    await execWithTimeout(
      new Promise((resolve) => {
        setTimeout(resolve, 400);
      }),
      100
    );
    const end = Date.now();
    const duration = end - start;
    expect(duration > 350).toBe(true);
    expect(duration < 450).toBe(true);
  });
});
