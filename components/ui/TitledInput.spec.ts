import TitledInput from './TitledInput.vue';
import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';

const titledInputSelector = '[data-testid=titledInput]';
const titledInputLabelSelector = '[data-testid=titledInputLabel]';
const titledInputRequiredIconSelector = '[data-testid=titledInputRequiredIcon]';

describe('TitledInput', () => {
  describe('props', () => {
    it('name - should render with set label "for" attribute', () => {
      const testName = 'test';
      const wrapper = shallowMount(TitledInput, {
        props: {
          name: testName,
          title: 'title',
        },
      });

      expect(wrapper.get(titledInputLabelSelector).attributes()['for']).toBe(
        testName
      );
    });
    it('title - should render with set title', () => {
      const testTitle = 'title';
      const wrapper = shallowMount(TitledInput, {
        props: {
          title: testTitle,
          name: 'test',
        },
      });

      expect(wrapper.get(titledInputLabelSelector).text()).toBe(testTitle);
    });
    it('focused - should render with gray border when set to false / not provided', () => {
      const wrapper = shallowMount(TitledInput, {
        props: {
          name: 'test',
        },
      });

      expect(wrapper.get(titledInputSelector).classes()).not.toContain(
        'border-violet-500'
      );
    });
    it('focused - should render with colored border when set to true', () => {
      const wrapper = shallowMount(TitledInput, {
        props: {
          name: 'test',
          focused: true,
        },
      });

      expect(wrapper.get(titledInputSelector).classes()).toContain(
        'border-violet-500'
      );
    });
    it('required - should not render required icon when set to false / not provided', () => {
      const wrapper = shallowMount(TitledInput, {
        props: {
          name: 'test',
        },
      });

      expect(wrapper.find(titledInputRequiredIconSelector).exists()).toBe(
        false
      );
    });
    it('required - should render required icon when set to true', () => {
      const wrapper = shallowMount(TitledInput, {
        props: {
          name: 'test',
          required: true,
        },
      });

      expect(wrapper.find(titledInputRequiredIconSelector).exists()).toBe(true);
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(TitledInput, {
      props: {
        name: 'test',
      },
    });
    expect(wrapper.get(titledInputSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <div
          class="border-[1px] rounded-lg py-2 px-5 transition-all"
          data-testid="titledInput"
        >
          <!--v-if-->
          <div
            class="flex gap-1 items-center justify-between"
          >
            
            
          </div>
        </div>,
      }
    `);
  });
});
