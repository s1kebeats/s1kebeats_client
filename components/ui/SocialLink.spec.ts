import SocialLink from './SocialLink.vue';
import { describe, expect, it } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';

const socialLinkIconSelector = '[data-testid=socialLinkIcon]';
const socialLinkSelector = '[data-testid=socialLink]';

const defaultMountOptions = {
  props: {
    username: 'username',
    icon: 'username',
    url: 'url',
  },
  getUrl(): string {
    return this.props.url + this.props.username;
  },
};

describe('SocialLink', () => {
  describe('props', () => {
    it('size - should render with 25px size when not provided', () => {
      const wrapper = shallowMount(SocialLink, defaultMountOptions);

      expect(wrapper.get(socialLinkIconSelector).attributes('size')).toBe(
        '25px'
      );
    });
    it('username - should render with set username', () => {
      const wrapper = shallowMount(SocialLink, defaultMountOptions);
      expect(wrapper.get(socialLinkSelector).attributes('href')).toContain(
        defaultMountOptions.props.username
      );
    });
    it('url - should render with set url', () => {
      const wrapper = shallowMount(SocialLink, defaultMountOptions);

      expect(wrapper.get(socialLinkSelector).attributes('href')).toContain(
        defaultMountOptions.props.url
      );
    });
    it('username + url - should render with complete link', () => {
      const wrapper = shallowMount(SocialLink, defaultMountOptions);

      expect(wrapper.get(socialLinkSelector).attributes('href')).toBe(
        defaultMountOptions.getUrl()
      );
    });
    it('icon - should render with set icon', () => {
      const wrapper = shallowMount(SocialLink, defaultMountOptions);

      expect(wrapper.get(socialLinkIconSelector).attributes('name')).toBe(
        defaultMountOptions.props.icon
      );
    });
    it('size - should render icon with set size', () => {
      const testSize = '199px';
      const wrapper = shallowMount(SocialLink, {
        ...defaultMountOptions,
        props: { ...defaultMountOptions.props, size: testSize },
      });

      expect(wrapper.get(socialLinkIconSelector).attributes('size')).toBe(
        testSize
      );
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(SocialLink, defaultMountOptions);
    expect(wrapper.get(socialLinkSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <a
          data-testid="socialLink"
          href="urlusername"
          target="_blank"
        >
          <icon
            data-testid="socialLinkIcon"
            name="username"
            size="25px"
          />
        </a>,
      }
    `);
  });
});
