import NavButton from './NavButton.vue';
import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';

const navButtonSelector = '[data-testid=navButton]';
const navButtonTextSelector = '[data-testid=navButtonText]';
const navButtonIconSelector = '[data-testid=navButtonIcon]';

const defaultMountOptions = {
  props: {
    text: 'test text',
    icon: 'test icon',
  },
};

describe('NavButton', () => {
  describe('props', () => {
    it('text - should render with set text', () => {
      const wrapper = shallowMount(NavButton, defaultMountOptions);
      expect(wrapper.get(navButtonTextSelector).text()).toBe(
        defaultMountOptions.props.text
      );
    });
    it('icon - should render with set icon', () => {
      const wrapper = shallowMount(NavButton, defaultMountOptions);
      expect(wrapper.get(navButtonIconSelector).attributes('name')).toBe(
        defaultMountOptions.props.icon
      );
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(NavButton, defaultMountOptions);
    expect(wrapper.get(navButtonSelector)).toMatchInlineSnapshot(`
          DOMWrapper {
            "isDisabled": [Function],
            "wrapperElement": <button
              class="rounded-lg py-2 px-4 font-medium text-sm flex items-center justify-center gap-2"
              data-testid="navButton"
            >
              <icon
                data-testid="navButtonIcon"
                name="test icon"
                size="20px"
              />
              <span
                data-testid="navButtonText"
              >
                test text
              </span>
            </button>,
          }
        `);
  });
});
