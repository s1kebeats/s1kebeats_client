import { describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Search from './Search.vue';

const headerSearchSelector = '[data-testid=headerSearch]';
const headerSearchInputSelector = '[data-testid=headerSearchInput]';

vi.stubGlobal('navigateTo', vi.fn());

// TODO: not working because of nuxt auto-imports
describe.todo('Search', () => {
  describe('User Interactions', () => {
    it('focus - should set colored border', async () => {
      const wrapper = shallowMount(Search);
      await wrapper.get(headerSearchInputSelector).trigger('focus');
      expect(wrapper.get(headerSearchSelector).classes()).toContain(
        'border-[#7945fc]'
      );
    });
    it('blur - should not set colored border', async () => {
      const wrapper = shallowMount(Search);
      await wrapper.get(headerSearchInputSelector).trigger('blur');
      expect(wrapper.get(headerSearchSelector).classes()).not.toContain(
        'border-[#7945fc]'
      );
    });
    it('enter - should redirect if focused', async () => {
      const testQuery = 'searchQuery';

      const wrapper = shallowMount(Search);

      await wrapper.get(headerSearchInputSelector).trigger('focus');
      await wrapper.get(headerSearchInputSelector).setValue(testQuery);
      await wrapper.trigger('keydown.enter');

      expect(navigateTo).toHaveBeenCalled();
      expect(navigateTo).toHaveBeenCalledWith(`/search?q=${testQuery}`);
    });
    it('enter - should not redirect if not focused', async () => {
      const wrapper = shallowMount(Search);
      await wrapper.get(headerSearchInputSelector).trigger('blur');
      await wrapper.trigger('keydown.enter');
      expect(navigateTo).not.toHaveBeenCalled();
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(Search);
    expect(wrapper.get(headerSearchSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <div
          class="absolute left-0 right-0 mx-auto gap-1 px-2 h-[55%] max-h-[80px] bg-white rounded-lg flex-1 border-[1px] w-[45%] max-w-[600px] flex items-center transition-all"
          data-testid="headerSearch"
        >
          <button>
            <icon
              class="cursor-pointer"
              name="material-symbols:search"
              size="20px"
            />
          </button>
          <input
            autocomplete="off"
            class="flex-1 h-[20px] focus:outline-none text-sm overflow-hidden"
            data-testid="headerSearchInput"
            placeholder="Найди свой звук"
            type="text"
          />
        </div>,
      }
    `);
  });
});
