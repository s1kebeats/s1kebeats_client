import UploadVersionSelect from './UploadVersionSelect.vue';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import useUploadStore from '@/components/modules/UploadForm/store';
import { createTestingPinia } from '@pinia/testing';

const defaultVersionSelector = '[data-testid=default]';
const extendedVersionSelector = '[data-testid=extended]';
const fillMessageSelector = '[data-testid=fillMessage]';
const nextButtonSelector = '[data-testid=nextButton]';

describe('UploadVersionSelect', () => {
  it('changes uploadVersion on click', async () => {
    const wrapper = mount(UploadVersionSelect, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
        ],
      },
    });
    const uploadStore = useUploadStore();

    await wrapper.get(defaultVersionSelector).trigger('click');
    expect(uploadStore.uploadVersion).toBe('default');

    await wrapper.get(extendedVersionSelector).trigger('click');
    expect(uploadStore.uploadVersion).toBe('extended');
  });
  it('does not swith page when uploadVersion is not filled', async () => {
    const wrapper = mount(UploadVersionSelect, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
        ],
      },
    });
    const uploadStore = useUploadStore();

    await wrapper.get(nextButtonSelector).trigger('click');
    expect(uploadStore.page).toBe(1);
  });
  it('shows fill message and changes style when uploadVersion is not filled', async () => {
    const wrapper = mount(UploadVersionSelect, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
        ],
      },
    });

    await wrapper.get(nextButtonSelector).trigger('click');
    expect(wrapper.find(fillMessageSelector).exists()).toBe(true);
    expect(wrapper.get(extendedVersionSelector).classes()).toContain(
      'border-red-500'
    );
  });
  it('removes styles and fill message when uploadVersion is filled', async () => {
    const wrapper = mount(UploadVersionSelect, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
        ],
      },
    });

    await wrapper.get(nextButtonSelector).trigger('click');
    await wrapper.get(defaultVersionSelector).trigger('click');
    expect(wrapper.get(extendedVersionSelector).classes()).not.toContain(
      'border-red-500'
    );
  });
  it('changes "selected" property on click', async () => {
    const wrapper = mount(UploadVersionSelect, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
        ],
      },
    });

    await wrapper.get(defaultVersionSelector).trigger('click');
    expect(wrapper.get(defaultVersionSelector).classes()).toContain(
      'text-white'
    );

    await wrapper.get(extendedVersionSelector).trigger('click');
    expect(wrapper.get(extendedVersionSelector).classes()).toContain(
      'text-white'
    );
    expect(wrapper.get(defaultVersionSelector).classes()).not.toContain(
      'text-white'
    );
  });
  it('switches page when uploadVersion is filled', async () => {
    const wrapper = mount(UploadVersionSelect, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
        ],
      },
    });
    const uploadStore = useUploadStore();
    await wrapper.get(defaultVersionSelector).trigger('click');
    expect(wrapper.get(defaultVersionSelector).classes()).toContain(
      'text-white'
    );

    await wrapper.get(nextButtonSelector).trigger('click');
    expect(uploadStore.page).toBe(2);
  });
});
