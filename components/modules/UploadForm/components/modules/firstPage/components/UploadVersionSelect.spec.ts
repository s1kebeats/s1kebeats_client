import UploadVersionSelect from './UploadVersionSelect.vue';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import useUploadStore from '@/components/modules/UploadForm/store';
import { createTestingPinia } from '@pinia/testing';

const defaultVersionSelector = '[data-testid=default]';
const extendedVersionSelector = '[data-testid=extended]';

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
});
