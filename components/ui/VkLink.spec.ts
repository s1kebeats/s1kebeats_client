import VkLink from './VkLink.vue';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

const vkIconSelector = '[data-testid=icon]';
const vkLinkSelector = '[data-testid=link]';

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

describe('VkLink', () => {
  it('renders with set username', () => {
    const wrapper = mount(VkLink, mountOptions);

    expect(wrapper.get(vkLinkSelector).attributes('href')).toBe(
      `https://vk.com/${testUsername}`
    );
  });
  it('renders with set width', () => {
    const wrapper = mount(VkLink, mountOptions);

    expect(wrapper.get(vkIconSelector).attributes('width')).toBe(testWidth);
  });
  it('renders with set heigth', () => {
    const wrapper = mount(VkLink, mountOptions);

    expect(wrapper.get(vkIconSelector).attributes('height')).toBe(testHeight);
  });
});
