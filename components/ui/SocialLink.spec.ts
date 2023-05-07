import SocialLink from './SocialLink.vue';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

const iconSelector = '[data-testid=icon]';
const linkSelector = '[data-testid=link]';

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
  it('should render with default width', () => {
    const wrapper = mount(SocialLink, defaultMountOptions);

    expect(wrapper.get(iconSelector).attributes('width')).toBe('25px');
  });
  it('should render with default height', () => {
    const wrapper = mount(SocialLink, defaultMountOptions);

    expect(wrapper.get(iconSelector).attributes('height')).toBe('25px');
  });
  it('should render with set username', () => {
    const wrapper = mount(SocialLink, defaultMountOptions);
    expect(wrapper.get(linkSelector).attributes('href')).toContain(
      defaultMountOptions.props.username
    );
  });
  it('should render with set url', () => {
    const wrapper = mount(SocialLink, defaultMountOptions);

    expect(wrapper.get(linkSelector).attributes('href')).toContain(
      defaultMountOptions.props.url
    );
  });
  it('should render with both url and username', () => {
    const wrapper = mount(SocialLink, defaultMountOptions);

    expect(wrapper.get(linkSelector).attributes('href')).toBe(
      defaultMountOptions.getUrl()
    );
  });
  it('should render with set icon', () => {
    const wrapper = mount(SocialLink, defaultMountOptions);

    expect(wrapper.get(iconSelector).attributes('name')).toBe(
      defaultMountOptions.props.icon
    );
  });
  it('should render with set width', () => {
    const testWidth = '199px';

    const wrapper = mount(SocialLink, {
      ...defaultMountOptions,
      props: { ...defaultMountOptions.props, width: testWidth },
    });

    expect(wrapper.get(iconSelector).attributes('width')).toBe(testWidth);
  });
  it('should render with set height', () => {
    const testHeight = '199px';

    const wrapper = mount(SocialLink, {
      ...defaultMountOptions,
      props: { ...defaultMountOptions.props, height: testHeight },
    });

    expect(wrapper.get(iconSelector).attributes('height')).toBe(testHeight);
  });
});
