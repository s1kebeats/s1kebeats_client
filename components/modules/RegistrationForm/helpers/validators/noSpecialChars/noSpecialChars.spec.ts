import noSpecialChars from './noSpecialChars';
import { describe, expect, it } from 'vitest';

describe('noSpecialChars', () => {
  it('string with special chars should return false', () => {
    expect(noSpecialChars('text!#')).toBe(false);
  });
  it('string with space should return false', () => {
    expect(noSpecialChars('tex t')).toBe(false);
  });
  it('string without special chars should return true', () => {
    expect(noSpecialChars('Text')).toBe(true);
  });
});
