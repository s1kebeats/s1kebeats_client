import { shallowMount } from '@vue/test-utils';
import VkLink from './VkLink.vue';
import { describe, expect, it } from 'vitest';

const defaultMountOptions = {
  props: {
    username: 'testUsername',
    size: '30px',
  },
};
const vkLinkSelector = '[data-testid=vkLink]';

describe('VkLink', () => {
  describe('props', () => {
    it('username - should render with set username', () => {
      const wrapper = shallowMount(VkLink, defaultMountOptions);
      expect(wrapper.get(vkLinkSelector).attributes('username')).toBe(
        defaultMountOptions.props.username
      );
    });
    it('size - should render with set size', () => {
      const wrapper = shallowMount(VkLink, defaultMountOptions);
      expect(wrapper.get(vkLinkSelector).attributes('size')).toBe(
        defaultMountOptions.props.size
      );
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(VkLink, defaultMountOptions);
    expect(wrapper.get(vkLinkSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <uisociallink
          data-testid="vkLink"
          icon="mdi:vk"
          size="30px"
          url="https://vk.com/"
          username="testUsername"
        />,
      }
    `);
  });
});
