import execWithTimeout from './execWithTimeout';
import { describe, it, expect } from 'vitest';

describe('execWithTimeout', () => {
  // fails sometimes, +- couple ms, dont worry if wasnt edited
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
    expect(duration).toBe(400);
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
    expect(duration).toBe(400);
  });
});
