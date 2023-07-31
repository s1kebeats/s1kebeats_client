import { shallowMount } from '@vue/test-utils';
import YoutubeLink from './YoutubeLink.vue';
import { describe, expect, it } from 'vitest';

const defaultMountOptions = {
  props: {
    username: 'testUsername',
    size: '30px',
  },
};
const youtubeLinkSelector = '[data-testid=youtubeLink]';

describe('YoutubeLink', () => {
  describe('props', () => {
    it('username - should render with set username', () => {
      const wrapper = shallowMount(YoutubeLink, defaultMountOptions);
      expect(wrapper.get(youtubeLinkSelector).attributes('username')).toBe(
        defaultMountOptions.props.username
      );
    });
    it('size - should render with set size', () => {
      const wrapper = shallowMount(YoutubeLink, defaultMountOptions);
      expect(wrapper.get(youtubeLinkSelector).attributes('size')).toBe(
        defaultMountOptions.props.size
      );
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(YoutubeLink, defaultMountOptions);
    expect(wrapper.get(youtubeLinkSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <uisociallink
          data-testid="youtubeLink"
          icon="mdi:youtube"
          size="30px"
          url="https://www.youtube.com/@"
          username="testUsername"
        />,
      }
    `);
  });
});
