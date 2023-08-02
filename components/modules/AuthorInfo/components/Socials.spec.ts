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
          ...defaultMountOptions.props!,
          instagram: null,
        },
      });
      expect(wrapper.find(instagramSelector).exists()).toBe(false);
    });
    it('author - should render instagram link if provided', () => {
      const wrapper = shallowMount(Socials, defaultMountOptions);
      expect(wrapper.find(instagramSelector).exists()).toBe(true);
    });
    it('author - should not render vk link if not provided', () => {
      const wrapper = shallowMount(Socials, {
        props: {
          ...defaultMountOptions.props!,
          vk: null,
        },
      });
      expect(wrapper.find(vkSelector).exists()).toBe(false);
    });
    it('author - should render vk link if provided', () => {
      const wrapper = shallowMount(Socials, defaultMountOptions);
      expect(wrapper.find(vkSelector).exists()).toBe(true);
    });
    it('author - should not render youtube link if not provided', () => {
      const wrapper = shallowMount(Socials, {
        props: {
          ...defaultMountOptions.props!,
          youtube: null,
        },
      });
      expect(wrapper.find(youtubeSelector).exists()).toBe(false);
    });
    it('author - should render youtube link if provided', () => {
      const wrapper = shallowMount(Socials, defaultMountOptions);
      expect(wrapper.find(youtubeSelector).exists()).toBe(true);
    });
  });
});
