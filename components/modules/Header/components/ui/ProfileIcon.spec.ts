import ProfileIcon from './ProfileIcon.vue';
import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import type User from '@/api/models/User';

const unauthorizedIconSelector = '[data-testid=unauthorized-icon]';
const profileImageSelector = '[data-testid=profile-image]';

const testUser: User = {
  email: 'test@example.com',
  username: 's1kebeats',
  id: 777,
  image: 'path/to/Image.png',
  displayedName: null,
};

describe('ProfileIcon', () => {
  it('should render unauthorized icon when not authorized', async () => {
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
    expect(wrapper.find(profileImageSelector).exists()).toBe(false);
  });
  it('should render profile image when authorized', async () => {
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

    expect(wrapper.find(unauthorizedIconSelector).exists()).toBe(false);
    expect(wrapper.find(profileImageSelector).exists()).toBe(true);
  });
});
