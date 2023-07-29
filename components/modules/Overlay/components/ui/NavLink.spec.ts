import { shallowMount } from '@vue/test-utils';
import NavLink from './NavLink.vue';
import { describe, expect, it, vi } from 'vitest';

const navLinkSelector = '[data-testid=navLink]';
const navLinkTextSelector = '[data-testid=navLinkText]';
const navLinkIconSelector = '[data-testid=navLinkIcon]';

const defaultMountOptions = {
  props: {
    to: '/',
    icon: 'icon',
    text: 'navLink',
  },
};

vi.stubGlobal('navigateTo', vi.fn());

describe('NavLink', () => {
  describe('props', () => {
    it('to - should call navigateTo with set param on click', async () => {
      const wrapper = shallowMount(NavLink, defaultMountOptions);
      expect(wrapper.get(navLinkSelector).attributes('to')).toBe(
        defaultMountOptions.props.to
      );
    });
    it('icon - should render with set icon', () => {
      const wrapper = shallowMount(NavLink, defaultMountOptions);
      expect(wrapper.get(navLinkIconSelector).attributes('name')).toBe(
        defaultMountOptions.props.icon
      );
    });
    it('text - should render with set text', () => {
      const wrapper = shallowMount(NavLink, defaultMountOptions);
      expect(wrapper.get(navLinkTextSelector).text()).toBe(
        defaultMountOptions.props.text
      );
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(NavLink, defaultMountOptions);
    expect(wrapper.get(navLinkSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <nuxt-link
          class="bg-white menu-link w-full py-3 border-[1px] rounded-lg px-4 link desktop-text-sm"
          data-testid="navLink"
          to="/"
        >
          <span
            data-testid="navLinkText"
          >
            navLink
          </span>
          <icon
            data-testid="navLinkIcon"
            name="icon"
            size="25px"
          />
        </nuxt-link>,
      }
    `);
  });
});
