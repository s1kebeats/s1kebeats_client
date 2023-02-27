import InstagramLink from './InstagramLink.vue';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

const instagramIconSelector = '[data-testid=icon]';
const instagramLinkSelector = '[data-testid=link]';

const testUsername = 'test';
const testWidth = '100px';
const testHeight = '100px';

const mountOptions = {
  props: {
    username: testUsername,
    width: testWidth,
    height: testHeight,
  },
};

describe('InstagramLink', () => {
  it('renders with set username', () => {
    const wrapper = mount(InstagramLink, mountOptions);

    expect(wrapper.get(instagramLinkSelector).attributes('href')).toBe(
      `https://www.instagram.com/${testUsername}`
    );
  });
  it('renders with set width', () => {
    const wrapper = mount(InstagramLink, mountOptions);

    expect(wrapper.get(instagramIconSelector).attributes('width')).toBe(
      testWidth
    );
  });
  it('renders with set heigth', () => {
    const wrapper = mount(InstagramLink, mountOptions);

    expect(wrapper.get(instagramIconSelector).attributes('height')).toBe(
      testHeight
    );
  });
});
