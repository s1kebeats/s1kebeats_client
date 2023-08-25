import ActivationPart from './ActivationPart.vue';
import { describe, it, expect, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { VueWrapper, mount, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import validationMessages from 'components/shared/validationMessages';

const pageFormSelector = '[data-testid=pageForm]';
const validationErrorOutputComponentSelector =
  '[data-testid=validationErrorOutputComponent]';
const activationCodeInputSelector = '[data-testid=activationCodeInput]';

const defaultMountOptions = {
  props: {
    errorState: true,
    errorStatus: 500,
    apiSubmitting: true,
  },
};

describe('ActivationPart', () => {
  beforeAll(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
  });
  beforeEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
  });
  describe('props', () => {
    it('errorState - should render pageForm with set errorState attr', () => {
      const wrapper = shallowMount(ActivationPart, defaultMountOptions);
      expect(wrapper.get(pageFormSelector).attributes('errorstate')).toBe(
        defaultMountOptions.props.errorState.toString()
      );
    });
    it('errorStatus - should render pageForm with set errorStatus attr', () => {
      const wrapper = shallowMount(ActivationPart, defaultMountOptions);
      expect(wrapper.get(pageFormSelector).attributes('errorstatus')).toBe(
        defaultMountOptions.props.errorStatus.toString()
      );
    });
    it('apiSubmitting - should render pageForm with set pending attr', () => {
      const wrapper = shallowMount(ActivationPart, defaultMountOptions);
      expect(wrapper.get(pageFormSelector).attributes('pending')).toBe(
        defaultMountOptions.props.apiSubmitting.toString()
      );
    });
  });
  describe('state', () => {
    it('should render PageForm with "pending" set to "false" by default', () => {
      const wrapper = shallowMount(ActivationPart, {
        props: {
          ...defaultMountOptions.props,
          apiSubmitting: false,
        },
      });
      expect(wrapper.get(pageFormSelector).attributes('pending')).toBe('false');
    });
    it('should render ValidationErrorOutput with "errors" attr set to "" by default', () => {
      const wrapper = shallowMount(ActivationPart, {
        props: defaultMountOptions.props,
        global: {
          renderStubDefaultSlot: true, // enables slots content rendering with shallowMount
        },
      });
      expect(
        wrapper.get(validationErrorOutputComponentSelector).attributes('errors')
      ).toBe('');
    });
    it('should render activationCodeInput without "state" attr set by default', async () => {
      const wrapper = shallowMount(ActivationPart, {
        props: defaultMountOptions.props,
        global: {
          renderStubDefaultSlot: true, // enables slots content rendering with shallowMount
        },
      });
      expect(
        wrapper.get(activationCodeInputSelector).attributes()
      ).not.toHaveProperty('state');
    });
  });
  describe('User Interactions', () => {
    describe('activationCode input', () => {
      it('empty activationCode form submit', async () => {
        const wrapper = mount(ActivationPart, defaultMountOptions);

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        await wrapper.find('form').trigger('submit');

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        // should render validationErrorOutput with activationCode.required validationMessage
        expect(
          wrapper.find('[data-testid=validationErrorOutput]').exists()
        ).toBe(true);
        expect(wrapper.find('[data-testid=validationErrorOutput]').text()).toBe(
          validationMessages.activationCode.required
        );

        // should not emit submit event
        expect(wrapper.emitted()).not.toHaveProperty('submit');
      });
    });
    it('pageForm closeError event - should emit closeError event', async () => {
      const wrapper = mount(ActivationPart, defaultMountOptions);

      await (wrapper.getComponent(pageFormSelector) as VueWrapper).vm.$emit(
        'closeError'
      );
      expect(wrapper.emitted()).toHaveProperty('closeError');
      expect(wrapper.emitted('closeError')).toHaveLength(1);
    });
    it('empty form submit', async () => {
      const wrapper = mount(ActivationPart, {
        props: defaultMountOptions.props,
        global: {
          stubs: {
            TextInput: true,
          },
        },
      });
      await wrapper.find('form').trigger('submit');

      await flushPromises();
      vi.runAllTimers();
      await flushPromises();

      // should render validationErrorOutput with activationCode.required validationMessage
      expect(wrapper.find('[data-testid=validationErrorOutput]').exists()).toBe(
        true
      );
      expect(wrapper.find('[data-testid=validationErrorOutput]').text()).toBe(
        validationMessages.activationCode.required
      );

      // should set "state" attr to "error" on activationCode input
      expect(wrapper.get(activationCodeInputSelector).attributes('state')).toBe(
        'error'
      );

      // should not emit submit event
      expect(wrapper.emitted()).not.toHaveProperty('submit');
    });
    it('valid form submit', async () => {
      const wrapper = mount(ActivationPart, defaultMountOptions);
      const testActivationCode = 'testActivationCode';

      await wrapper
        .get('input[name=activationCodeInput]')
        .setValue(testActivationCode);

      await flushPromises();
      vi.runAllTimers();
      await flushPromises();

      await wrapper.find('form').trigger('submit');

      await flushPromises();
      vi.runAllTimers();
      await flushPromises();

      // should not render validationErrorOutput
      expect(wrapper.find('[data-testid=validationErrorOutput]').exists()).toBe(
        false
      );

      // should emit submit event with typed value
      expect(wrapper.emitted()).toHaveProperty('submit');
      expect(wrapper.emitted('submit')).toHaveLength(1);
      expect(wrapper.emitted('submit')![0][0]).toStrictEqual(testActivationCode);
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(ActivationPart, {
      props: defaultMountOptions.props,
      global: {
        renderStubDefaultSlot: true, // enables slots content rendering with shallowMount
      },
    });
    expect(wrapper.element).toMatchInlineSnapshot(`
      <page-form-stub
        buttontext="Подтвердить"
        data-testid="pageForm"
        errorstate="true"
        errorstatus="500"
        pending="true"
        title="Подтверждение входа"
      >
        <p
          class="text-center text-md"
        >
           Проверьте электронную почту, мы отправили вам код. 
        </p>
        <text-input-stub
          autocomplete="off"
          data-testid="activationCodeInput"
          debounce="false"
          disabled="false"
          label="Введите код"
          name="activationCodeInput"
          size="sm"
          type="text"
        />
        <validation-error-output-stub
          data-testid="validationErrorOutputComponent"
          errors=""
        />
      </page-form-stub>
    `);
  });
});
