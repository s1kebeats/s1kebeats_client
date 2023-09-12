import { describe, expect, it, vi } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import Search from './Search.vue';

const headerSearchSelector = '[data-testid=headerSearch]';
const headerSearchInputSelector = 'input[name="header-search"]';

const testQuery = 'test-query';

vi.stubGlobal('navigateTo', vi.fn());
vi.mock('vue-router', () => ({
  useRoute: () => {
    return {
      query: {
        q: testQuery,
      },
    };
  },
}));

describe('Search', () => {
  describe('state', () => {
    it('route.query.q - should set textInput "preset" attr', async () => {
      const wrapper = shallowMount(Search);
      expect(wrapper.get(headerSearchSelector).attributes('preset')).toBe(
        testQuery
      );
    });
  });
  describe('User Interactions', () => {
    it('text input callback call - should call navigateTo with valid path and query', async () => {
      const testQuery = 'searchQuery';

      const wrapper = mount(Search);

      await wrapper.get(headerSearchInputSelector).setValue(testQuery);
      // submit button selector
      await wrapper.get(`${headerSearchSelector} button`).trigger('click');

      expect(navigateTo).toHaveBeenCalled();
      expect(navigateTo).toHaveBeenCalledWith(`/search?q=${testQuery}`);
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(Search);
    expect(wrapper.get(headerSearchSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <text-input-stub
          autocomplete="off"
          callback="[Function]"
          class="grow"
          data-testid="headerSearch"
          debounce="false"
          disabled="false"
          icon="material-symbols:search"
          label="Поиск"
          name="header-search"
          preset="test-query"
          size="sm"
          type="text"
        />,
      }
    `);
  });
});
