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
  it('submits on enter', async () => {
    const wrapper = mount(Search);

    await wrapper.get(headerSearchInputSelector).trigger('focus');
    await wrapper.trigger('keypress.enter');
    //TODO: navigationTest
  });
  it('stops submittion after blur', async () => {
    const wrapper = mount(Search);

    await wrapper.get(headerSearchInputSelector).trigger('focus');
    await wrapper.trigger('keypress.enter');
    //TODO: navigationTest
    // expect navigation
    await wrapper.get(headerSearchInputSelector).trigger('blur');
    await wrapper.trigger('keypress.enter');
    // do not expect navigation
  });
});
