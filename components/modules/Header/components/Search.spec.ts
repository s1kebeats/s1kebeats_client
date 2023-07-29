import { describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Search from './Search.vue';

const headerSearchSelector = '[data-testid=headerSearch]';
const headerSearchInputSelector = '[data-testid=headerSearchInput]';

const testQuery = 'test-query';

vi.stubGlobal('navigateTo', vi.fn());
vi.stubGlobal(
  'useRoute',
  vi.fn(() => {
    return {
      query: {
        q: testQuery,
      },
    };
  })
);

// !: not working because of nuxt auto-imports
describe('Search', () => {
  describe('state', () => {
    it('route.query.q - should set textInput "preset" attr', async () => {
      const wrapper = shallowMount(Search);
      expect(wrapper.get(headerSearchInputSelector).attributes('preset')).toBe(
        testQuery
      );
    });
  });
  describe('User Interactions', () => {
    it('text input callback call - should call navigateTo with valid path and query', async () => {
      const testQuery = 'searchQuery';

      const wrapper = shallowMount(Search);

      await wrapper.get(headerSearchInputSelector).setValue(testQuery);
      await wrapper.get(headerSearchInputSelector).trigger('keydown.enter');

      expect(navigateTo).toHaveBeenCalled();
      expect(navigateTo).toHaveBeenCalledWith(`/search?q=${testQuery}`);
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
