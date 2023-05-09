import SocialLink from './SocialLink.vue';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

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
      const wrapper = mount(SocialLink, defaultMountOptions);

      expect(wrapper.get(socialLinkIconSelector).attributes('size')).toBe(
        '25px'
      );
    });
    it('username - should render with set username', () => {
      const wrapper = mount(SocialLink, defaultMountOptions);
      expect(wrapper.get(socialLinkSelector).attributes('href')).toContain(
        defaultMountOptions.props.username
      );
    });
    it('url - should render with set url', () => {
      const wrapper = mount(SocialLink, defaultMountOptions);

      expect(wrapper.get(socialLinkSelector).attributes('href')).toContain(
        defaultMountOptions.props.url
      );
    });
    it('username + url - should render with complete link', () => {
      const wrapper = mount(SocialLink, defaultMountOptions);

      expect(wrapper.get(socialLinkSelector).attributes('href')).toBe(
        defaultMountOptions.getUrl()
      );
    });
    it('icon - should render with set icon', () => {
      const wrapper = mount(SocialLink, defaultMountOptions);

      expect(wrapper.get(socialLinkIconSelector).attributes('name')).toBe(
        defaultMountOptions.props.icon
      );
    });
    it('size - should render icon with set size', () => {
      const testSize = '199px';
      const wrapper = mount(SocialLink, {
        ...defaultMountOptions,
        props: { ...defaultMountOptions.props, size: testSize },
      });

      expect(wrapper.get(socialLinkIconSelector).attributes('size')).toBe(
        testSize
      );
    });
  });
});
