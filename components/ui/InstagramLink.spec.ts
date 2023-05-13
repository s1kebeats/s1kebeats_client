import { shallowMount } from '@vue/test-utils';
import InstagramLink from './InstagramLink.vue';
import { describe, expect, it } from 'vitest';

const defaultMountOptions = {
  props: {
    username: 'testUsername',
    size: '30px',
  },
};
const instagramLinkSelector = '[data-testid=instagramLink]';

describe('InstagramLink', () => {
  describe('props', () => {
    it('username - should render with set username', () => {
      const wrapper = shallowMount(InstagramLink, defaultMountOptions);
      expect(wrapper.get(instagramLinkSelector).attributes('username')).toBe(
        defaultMountOptions.props.username
      );
    });
    it('size - should render with set size', () => {
      const wrapper = shallowMount(InstagramLink, defaultMountOptions);
      expect(wrapper.get(instagramLinkSelector).attributes('size')).toBe(
        defaultMountOptions.props.size
      );
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(InstagramLink, defaultMountOptions);
    expect(wrapper.get(instagramLinkSelector)).toMatchInlineSnapshot(`
          DOMWrapper {
            "isDisabled": [Function],
            "wrapperElement": <uisociallink
              data-testid="instagramLink"
              icon="mdi:instagram"
              size="30px"
              url="https://www.instagram.com/"
              username="testUsername"
            />,
          }
        `);
  });
});
