import { vi } from 'vitest';

const LocalStorageMock = (() => {
  const storage: { [key: string]: string } = {};
  return {
    getItem: vi.fn((key: string) => storage[key]),
    setItem: vi.fn((key: string, value: string) => (storage[key] = value)),
  };
})();
export default LocalStorageMock;
