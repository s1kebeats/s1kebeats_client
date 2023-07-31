import PageForm from './PageForm.vue';
import { describe, it, expect } from 'vitest';
import { VueWrapper, mount, shallowMount } from '@vue/test-utils';

const formTitleSelector = '[data-testid=formTitle]';
const actionButtonSelector = '[data-testid=actionButton]';
const formFooterSelector = '[data-testid=formFooter]';
const footerHintSelector = '[data-testid=footerHint]';
const footerLinkSelector = '[data-testid=footerLink]';
const formRequestErrorOutputSelector = '[data-testid=formRequestErrorOutput]';

const defaultMountOptions = {
  props: {
    title: 'testForm',
    pending: false,
    buttonText: 'testAction',
    footerHint: 'testHint',
    footerLinkTitle: 'testLinkTitle',
    footerTo: '/test',
    errorState: false,
    errorStatus: 403,
  },
};

describe('PageForm', () => {
  describe('props', () => {
    it('title - should render with set title', () => {
      const wrapper = shallowMount(PageForm, defaultMountOptions);
      expect(wrapper.get(formTitleSelector).text()).toBe(
        defaultMountOptions.props.title
      );
    });
    it('pending - should render actionButton with set "loading" attr', () => {
      const wrapper = shallowMount(PageForm, defaultMountOptions);
      expect(wrapper.get(actionButtonSelector).attributes('loading')).toBe(
        defaultMountOptions.props.pending.toString()
      );
    });
    it('butonText - should render actionButton with set text', () => {
      const wrapper = mount(PageForm, defaultMountOptions);
      expect(wrapper.get(actionButtonSelector).text()).toBe(
        defaultMountOptions.props.buttonText
      );
    });
    it('footerHint, footerLinkTitle, footerTo - should not render formFooter if was not provided', () => {
      const wrapper = shallowMount(PageForm, {
        props: {
          ...defaultMountOptions.props,
          footerHint: undefined,
          footerLinkTitle: undefined,
          footerTo: undefined,
        },
      });
      expect(wrapper.find(formFooterSelector).exists()).toBe(false);
    });
    it('footerHint, footerLinkTitle, footerTo - should render formFooter if all 3 were provided', () => {
      const wrapper = shallowMount(PageForm, defaultMountOptions);
      expect(wrapper.find(formFooterSelector).exists()).toBe(true);
    });
    it('footerHint - should render footerHint with set text', () => {
      const wrapper = shallowMount(PageForm, defaultMountOptions);
      expect(wrapper.get(footerHintSelector).text()).toBe(
        defaultMountOptions.props.footerHint
      );
    });
    it('footerLinkTitle - should render footerLink with set text', () => {
      const wrapper = shallowMount(PageForm, defaultMountOptions);
      expect(wrapper.get(footerLinkSelector).text()).toBe(
        defaultMountOptions.props.footerLinkTitle
      );
    });
    it('footerTo - should render footerLink with set "to" attr', () => {
      const wrapper = shallowMount(PageForm, defaultMountOptions);
      expect(wrapper.get(footerLinkSelector).attributes('to')).toBe(
        defaultMountOptions.props.footerTo
      );
    });
    it('errorState - should render requestErrorOutput with set "open" attr', () => {
      const wrapper = shallowMount(PageForm, defaultMountOptions);
      expect(
        wrapper.get(formRequestErrorOutputSelector).attributes('open')
      ).toBe(defaultMountOptions.props.errorState.toString());
    });
    it('errorStatus - should render requestErrorOutput with set "status" attr', () => {
      const wrapper = shallowMount(PageForm, defaultMountOptions);
      expect(
        wrapper.get(formRequestErrorOutputSelector).attributes('status')
      ).toBe(defaultMountOptions.props.errorStatus.toString());
    });
  });
  describe('User Interactions', () => {
    it('form submit - should emit "submitForm" event', async () => {
      const wrapper = mount(PageForm, defaultMountOptions);
      await wrapper.get('[data-testid=form]').trigger('submit');
      expect(wrapper.emitted()).toHaveProperty('submitForm');
      expect(wrapper.emitted('submitForm')).toHaveLength(1);
    });
    it('formRequestErrorOutput "close" event - should emit "closeError" event', async () => {
      const wrapper = mount(PageForm, defaultMountOptions);
      await (
        wrapper.getComponent(formRequestErrorOutputSelector) as VueWrapper
      ).vm.$emit('close');
      expect(wrapper.emitted()).toHaveProperty('closeError');
      expect(wrapper.emitted('closeError')).toHaveLength(1);
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(PageForm, defaultMountOptions);
    expect(wrapper.element).toMatchInlineSnapshot(`
      <div
        class="w-full flex flex-col items-center justify-center gap-7"
      >
        <h1
          class="link desktop-display-xs"
          data-testid="formTitle"
        >
          testForm
        </h1>
        <form
          class="relative flex flex-col w-full gap-3"
          data-testid="form"
        >
          <request-error-output-stub
            data-testid="formRequestErrorOutput"
            open="false"
            status="403"
          />
          
          
          <button-stub
            data-testid="actionButton"
            loading="false"
            position="left"
            size="sm"
            type="primary"
          />
          <footer
            class="w-full desktop-text-xs flex items-center justify-center gap-2"
            data-testid="formFooter"
          >
            <span
              class="text-black"
              data-testid="footerHint"
            >
              testHint
            </span>
            <nuxt-link
              class="text-primary link transition-all hover:text-primary-default_strong"
              data-testid="footerLink"
              to="/test"
            >
              testLinkTitle
            </nuxt-link>
          </footer>
        </form>
      </div>
    `);
  });
});
