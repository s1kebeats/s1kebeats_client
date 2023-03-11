import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Search from './Search.vue';

const searchSelector = '[data-testid=headerSearch]';
const headerSearchInputSelector = '[data-testid=headerSearchInput]';

describe('Search', () => {
  it('changes color on focus', async () => {
    const wrapper = mount(Search);

    expect(wrapper.get(searchSelector).classes()).not.toContain(
      'border-[#7945fc]'
    );

    await wrapper.get(headerSearchInputSelector).trigger('focus');
    expect(wrapper.get(searchSelector).classes()).toContain('border-[#7945fc]');

    await wrapper.get(headerSearchInputSelector).trigger('blur');
    expect(wrapper.get(searchSelector).classes()).not.toContain(
      'border-[#7945fc]'
    );
  });
  it('changes color on focus', async () => {
    const wrapper = mount(Search);

    expect(wrapper.get(searchSelector).classes()).not.toContain(
      'border-[#7945fc]'
    );

    await wrapper.get(headerSearchInputSelector).trigger('focus');
    expect(wrapper.get(searchSelector).classes()).toContain('border-[#7945fc]');

    await wrapper.get(headerSearchInputSelector).trigger('blur');
    expect(wrapper.get(searchSelector).classes()).not.toContain(
      'border-[#7945fc]'
    );
  });
});
