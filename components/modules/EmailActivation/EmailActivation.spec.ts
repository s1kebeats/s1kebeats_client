import EmailActivation from './EmailActivation.vue';
import { describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import activate from './api/activate';

vi.mock('./api/activate', () => {
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
    shallowMount(EmailActivation, {
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

    expect(activate).toHaveBeenCalledWith('testActivation');
  });
});
