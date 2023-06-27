import { describe, it, expect, vi } from 'vitest';
import activate from './activate';
import $api from '@/api';

const testActivationString = 'activationString';

vi.mock('@/api');

describe('activate', () => {
  it('should call $api.post with valid param', async () => {
    await activate(testActivationString);
    expect($api.post).toHaveBeenCalledWith(`/activate/${testActivationString}`);
  });
});
