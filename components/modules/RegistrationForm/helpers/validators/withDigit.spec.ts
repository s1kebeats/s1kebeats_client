import withDigit from './withDigit';
import { describe, expect, it } from 'vitest';

describe('withDigit', () => {
    it('string without digit letter should return false', () => {
        expect(withDigit('text')).toBe(false);
    })
    it('string with digit letter should return true', () => {
        expect(withDigit('text1')).toBe(true);
    })
})