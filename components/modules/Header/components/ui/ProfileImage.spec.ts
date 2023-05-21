import ProfileImage from './ProfileImage.vue';
import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import type User from '@/api/models/User';

const profileImageSelector = '[data-testid=profileImage]';
const profileIconSelector = '[data-testid=authorizedIcon]';

const testUser: User = {
  email: 'test@example.com',
  username: 's1kebeats',
  id: 777,
  image: 'path/to/Image.png',
  displayedName: null,
};

describe('ProfileImage', () => {
  it('should render profile image when provided', async () => {
    const wrapper = shallowMount(ProfileImage, {
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
    expect(wrapper.find(profileIconSelector).exists()).toBeFalsy();
    expect(wrapper.find(profileImageSelector).exists()).toBe(true);
    expect(wrapper.get(profileImageSelector).attributes('src')).toBe(
      testUser.image
    );
  });
  it('should render icon when profile image is not provided', async () => {
    const wrapper = shallowMount(ProfileImage, {
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
    expect(wrapper.find(profileImageSelector).exists()).toBeFalsy();
    expect(wrapper.find(profileIconSelector).exists()).toBe(true);
    expect(wrapper.get(profileIconSelector).text()).toBe(
      testUser.username[0].toUpperCase()
    );
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(ProfileImage, {
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
    expect(wrapper.get(profileImageSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <appapiimage
          alt="Profile Image"
          class="rounded-full border-[1px] w-[32px] h-[32px]"
          data-testid="profileImage"
          height="32px"
          src="path/to/Image.png"
          width="32px"
        />,
      }
    `);
  });
});
