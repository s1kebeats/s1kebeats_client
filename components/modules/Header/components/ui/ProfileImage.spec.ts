import ProfileImage from './ProfileImage.vue';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import User from '@/api/models/User';

const profileImageSelector = '[data-testid=profile-image]';
const profileIconSelector = '[data-testid=authorized-icon]';

const testUser: User = {
  email: 'test@example.com',
  username: 's1kebeats',
  id: 777,
  image: 'path/to/Image.png',
  displayedName: null,
};

describe('ProfileImage', () => {
  it('renders profile image when it is provided', async () => {
    const wrapper = mount(ProfileImage, {
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
    expect(wrapper.find(profileIconSelector).exists()).toBe(false);
    expect(wrapper.find(profileImageSelector).exists()).toBe(true);
    expect(wrapper.get(profileImageSelector).attributes('src')).toBe(
      testUser.image
    );
  });
  it('renders icon without profile image provided', async () => {
    const wrapper = mount(ProfileImage, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              auth: {
                authorized: true,
                user: {
                  ...testUser,
                  image: null,
                },
              },
            },
          }),
        ],
      },
    });
    expect(wrapper.find(profileImageSelector).exists()).toBe(false);
    expect(wrapper.find(profileIconSelector).exists()).toBe(true);
    expect(wrapper.get(profileIconSelector).text()).toBe(
      testUser.username[0].toUpperCase()
    );
  });
});
