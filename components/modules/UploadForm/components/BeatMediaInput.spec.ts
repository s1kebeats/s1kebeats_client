import BeatMediaInput from './BeatMediaInput.vue';
import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import useUploadStore from '../store';
import type BeatUpload from '@/api/models/BeatUpload';

const fileInputSelector = '[data-testid=fileInput]';
const loadingSelector = '[data-testid=loading]';
const labelSelector = '[data-testid=label]';
const requiredSelector = '[data-testid=required]';
const titleSelector = '[data-testid=title]';
const descriptionSelector = '[data-testid=description]';
const iconSelector = '[data-testid=icon]';

const defaultMountOptions = {
  props: {
    title: 'title',
    description: 'description',
    name: 'name',
    icon: 'icon',
    accept: '.txt',
    required: true,
    field: 'mp3' as keyof BeatUpload,
    maxSize: 1,
  },
};

describe('BeatMediaInput', () => {
  it('should render with set name, label "for" field and id', () => {
    const wrapper = shallowMount(BeatMediaInput, {
      ...defaultMountOptions,
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(wrapper.get(fileInputSelector).attributes('name')).toBe(
      defaultMountOptions.props.name
    );
    expect(wrapper.get(fileInputSelector).attributes('id')).toBe(
      defaultMountOptions.props.name
    );
    expect(wrapper.get(labelSelector).attributes('for')).toBe(
      defaultMountOptions.props.name
    );
  });
  it('should render with set accept field', () => {
    const wrapper = shallowMount(BeatMediaInput, {
      ...defaultMountOptions,
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(wrapper.get(fileInputSelector).attributes('accept')).toBe(
      defaultMountOptions.props.accept
    );
  });
  it('should render with set title and description', () => {
    const wrapper = shallowMount(BeatMediaInput, {
      ...defaultMountOptions,
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(wrapper.get(titleSelector).text()).toBe(
      defaultMountOptions.props.title
    );
    expect(wrapper.get(descriptionSelector).text()).toBe(
      defaultMountOptions.props.description
    );
  });
  it('should render with set icon', () => {
    const wrapper = shallowMount(BeatMediaInput, {
      ...defaultMountOptions,
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(wrapper.get(iconSelector).attributes('name')).toBe(
      defaultMountOptions.props.icon
    );
  });
  it('should render required when set to true', () => {
    const wrapper = shallowMount(BeatMediaInput, {
      ...defaultMountOptions,
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(wrapper.find(requiredSelector).exists()).toBe(true);
  });
  it('should not render required when set to false', () => {
    const wrapper = shallowMount(BeatMediaInput, {
      props: {
        ...defaultMountOptions.props,
        required: false,
      },
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(wrapper.find(requiredSelector).exists()).toBe(false);
  });
  // TODO: file upload testing (don't know how to do that rn)
});
