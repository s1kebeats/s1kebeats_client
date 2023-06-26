import { shallowMount } from '@vue/test-utils';
import UploadButton from './UploadButton.vue';
import { describe, expect, it, vi } from 'vitest';

const uploadButtonSelector = '[data-testid=uploadButton]';

vi.stubGlobal('navigateTo', vi.fn());

describe('UploadButton', () => {
  describe('User Interactions', () => {
    it('click - should redirect to upload page', async () => {
      const wrapper = shallowMount(UploadButton);
      await wrapper.get(uploadButtonSelector).trigger('click');
      expect(navigateTo).toHaveBeenCalled();
      expect(navigateTo).toHaveBeenCalledWith('/upload');
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(UploadButton);
    expect(wrapper.get(uploadButtonSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <nav-button-stub
          class="bg-black text-white"
          data-testid="uploadButton"
          icon="material-symbols:upload-rounded"
          text="Опубликовать"
        />,
      }
    `);
  });
});
