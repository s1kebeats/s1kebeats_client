import YoutubeLink from './YoutubeLink.vue';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

const youtubeIconSelector = '[data-testid=icon]';
const youtubeLinkSelector = '[data-testid=link]';

describe('YoutubeLink', () => {
  it('renders with set size and username', () => {
    const testUsername = 'test';
    const testWidth = '100px';
    const testHeight = '100px';

    const wrapper = mount(YoutubeLink, {
      props: {
        username: testUsername,
        width: testWidth,
        height: testHeight,
      },
    });

    expect(wrapper.get(youtubeLinkSelector).attributes('href')).toBe(
      `https://www.youtube.com/@${testUsername}`
    );
    expect(wrapper.get(youtubeIconSelector).attributes('width')).toBe(
      testWidth
    );
    expect(wrapper.get(youtubeIconSelector).attributes('height')).toBe(
      testHeight
    );
  });
});
