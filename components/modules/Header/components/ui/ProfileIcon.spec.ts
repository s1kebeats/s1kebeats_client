import ProfileIcon from './ProfileIcon.vue';
import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import type User from '@/api/models/User';

const unauthorizedIconSelector = '[data-testid=unauthorizedIcon]';
const profileImageSelector = '[data-testid=profileImage]';

const testUser: User = {
  email: 'test@example.com',
  username: 's1kebeats',
  id: 777,
  image: 'path/to/Image.png',
  displayedName: null,
};

describe('ProfileIcon', () => {
  it('should render unauthorized icon without profile image when not authorized', async () => {
    const wrapper = shallowMount(ProfileIcon, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              auth: {
                authorized: false,
                user: null,
              },
            },
          }),
        ],
      },
    });

    expect(wrapper.find(unauthorizedIconSelector).exists()).toBe(true);
    expect(wrapper.find(profileImageSelector).exists()).toBeFalsy();
  });
  it('should render profile image without unauthorized icon when authorized', async () => {
    const wrapper = shallowMount(ProfileIcon, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              auth: {
                authorized: true,
                user: testUser,
              },
            },
          }),
        ],
      },
    });

    expect(wrapper.find(unauthorizedIconSelector).exists()).toBeFalsy();
    expect(wrapper.find(profileImageSelector).exists()).toBe(true);
  });
});
