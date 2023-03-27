import EmailActivation from './EmailActivation.vue';
import { describe, expect, it, vi } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import UiLoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import EmailActivationError from './components/EmailActivationError.vue';

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
    const wrapper = shallowMount(EmailActivation, {
      global: {
        plugins: [createTestingPinia()],
        mocks: {
          $route: {
            params: {
              link: 'testActivation',
            },
          },
        },
        stubs: {
          UiLoadingSpinner,
          EmailActivationError,
          NuxtLink: true,
          Icon: true,
        },
      },
    });
    const refresh = vi.fn();

    expect(refresh).toHaveBeenCalledWith('testActivation');
  });
});
