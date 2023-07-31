import withCapitalLetter from './withCapitalLetter';
import { describe, expect, it } from 'vitest';

describe('withCapitalLetter', () => {
  it('string without capital letter should return false', () => {
    expect(withCapitalLetter('text')).toBeFalsy();
  });
  it('string with capital letter should return true', () => {
    expect(withCapitalLetter('Text')).toBe(true);
  });
});
