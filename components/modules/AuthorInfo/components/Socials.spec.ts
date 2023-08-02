import Socials from './Socials.vue';
import { describe, it, expect } from 'vitest';
import { ComponentMountingOptions, shallowMount } from '@vue/test-utils';
import { AuthorIndividualStaticMock } from '@/testing/mocks/AuthorIndividual.mock';

const instagramSelector = '[data-testid=instagram]';
const vkSelector = '[data-testid=vk]';
const youtubeSelector = '[data-testid=youtube]';

const defaultMountOptions: ComponentMountingOptions<typeof Socials> = {
  props: {
    author: AuthorIndividualStaticMock,
  },
};

describe('Socials', () => {
  describe('props', () => {
    it('author - should not render instagram link if not provided', () => {
      const wrapper = shallowMount(Socials, {
        props: {
          author: {
            ...defaultMountOptions.props!.author,
            instagram: null,
          },
        },
      });
      expect(wrapper.find(instagramSelector).exists()).toBe(false);
    });
    it('author - should render instagram link if provided', () => {
      const wrapper = shallowMount(Socials, defaultMountOptions);
      expect(wrapper.find(instagramSelector).exists()).toBe(true);
    });
    it('author - should render instagram link with set username', () => {
      const wrapper = shallowMount(Socials, defaultMountOptions);
      expect(wrapper.get(instagramSelector).attributes('username')).toBe(
        defaultMountOptions.props!.author.instagram
      );
    });
    it('author - should not render vk link if not provided', () => {
      const wrapper = shallowMount(Socials, {
        props: {
          ...defaultMountOptions.props!,
          author: {
            ...defaultMountOptions.props!.author,
            vk: null,
          },
        },
      });
      expect(wrapper.find(vkSelector).exists()).toBe(false);
    });
    it('author - should render vk link if provided', () => {
      const wrapper = shallowMount(Socials, defaultMountOptions);
      expect(wrapper.find(vkSelector).exists()).toBe(true);
    });
    it('author - should render vk link with set username', () => {
      const wrapper = shallowMount(Socials, defaultMountOptions);
      expect(wrapper.get(vkSelector).attributes('username')).toBe(
        defaultMountOptions.props!.author.vk
      );
    });
    it('author - should not render youtube link if not provided', () => {
      const wrapper = shallowMount(Socials, {
        props: {
          author: {
            ...defaultMountOptions.props!.author,
            youtube: null,
          },
        },
      });
      expect(wrapper.find(youtubeSelector).exists()).toBe(false);
    });
    it('author - should render youtube link if provided', () => {
      const wrapper = shallowMount(Socials, defaultMountOptions);
      expect(wrapper.find(youtubeSelector).exists()).toBe(true);
    });
    it('author - should render youtube link with set username', () => {
      const wrapper = shallowMount(Socials, defaultMountOptions);
      expect(wrapper.get(youtubeSelector).attributes('username')).toBe(
        defaultMountOptions.props!.author.youtube
      );
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(Socials, defaultMountOptions);
    expect(wrapper.element).toMatchInlineSnapshot(`
      <div
        class="flex gap-1 items-center"
      >
        <instagram-link-stub
          data-testid="instagram"
          username="@username"
        />
        <vk-link-stub
          data-testid="vk"
          username="username"
        />
        <youtube-link-stub
          data-testid="youtube"
          username="@username"
        />
      </div>
    `);
  });
});
