import EmailActivation from './EmailActivation.vue';
import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

vi.mock('./api/refresh', () => {
  return {
    default: () => {
      return {
        data: true,
      };
    },
  };
});

describe('EmailActivation', () => {
  it('calls activate api with valid activation string', () => {
    mount(EmailActivation, {
      global: {
        plugins: [createTestingPinia()],
        mocks: {
          $route: {
            params: {
              link: 'testActivation',
            },
          },
        },
      },
    });
    const refresh = vi.fn();

    expect(refresh).toHaveBeenCalledWith('testActivation');
  });
});
