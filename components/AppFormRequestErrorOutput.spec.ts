import { describe, expect, it } from 'vitest';
import AppFormRequestErrorOutput from './AppFormRequestErrorOutput.vue';
import { shallowMount } from '@vue/test-utils';

const formRequestErrorOutputSelector = '[data-testid=formRequestErrorOutput]';
const errorTitleSelector = '[data-testid=errorTitle]';
const errorDescriptionSelector = '[data-testid=errorDescription]';
const closeButtonSelector = '[data-testid=closeButton]';

const defaultMountOptions = {
  props: {
    open: false,
  },
};

describe('FormRequestErrorOutput', async () => {
  describe('props', () => {
    it('open - should render invisible when set to false', () => {
      const wrapper = shallowMount(AppFormRequestErrorOutput, {
        props: {
          open: false,
        },
      });

      expect(wrapper.get(formRequestErrorOutputSelector).isVisible()).toBe(
        false
      );
    });
    it('open - should render visible when set to true', () => {
      const wrapper = shallowMount(AppFormRequestErrorOutput, {
        props: {
          open: true,
        },
      });

      expect(wrapper.get(formRequestErrorOutputSelector).isVisible()).toBe(
        true
      );
    });
    it('status - should render unexpected error output with description, without prop provided', () => {
      const wrapper = shallowMount(
        AppFormRequestErrorOutput,
        defaultMountOptions
      );

      expect(wrapper.get(errorTitleSelector).text()).toBe(
        'Произошла непредвиденная ошибка'
      );
      expect(wrapper.find(errorDescriptionSelector).exists()).toBe(true);
      expect(wrapper.get(errorDescriptionSelector).text()).toBe(
        'Проверьте ваше интернет соединение'
      );
    });
    it('status - should render wrong login credentials error output without description, when set to 401', () => {
      const wrapper = shallowMount(AppFormRequestErrorOutput, {
        props: {
          open: true,
          status: 401,
        },
      });

      expect(wrapper.get(errorTitleSelector).text()).toBe(
        'Неверные данные для входа'
      );
      expect(wrapper.find(errorDescriptionSelector).exists()).toBeFalsy();
    });
    it('status - should render confirm email error output without description, when set to 403', () => {
      const wrapper = shallowMount(AppFormRequestErrorOutput, {
        props: {
          open: true,
          status: 403,
        },
      });

      expect(wrapper.get(errorTitleSelector).text()).toBe(
        'Подтвердите электронную почту'
      );
      expect(wrapper.find(errorDescriptionSelector).exists()).toBeFalsy();
    });
  });
  describe('User Interactions', () => {
    it('click - should emit close event', async () => {
      const wrapper = shallowMount(
        AppFormRequestErrorOutput,
        defaultMountOptions
      );

      await wrapper.get(closeButtonSelector).trigger('click');
      expect(wrapper.emitted()).toHaveProperty('close');
      expect(wrapper.emitted('close')).toHaveLength(1);
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(
      AppFormRequestErrorOutput,
      defaultMountOptions
    );
    expect(wrapper.get(formRequestErrorOutputSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <div
          class="absolute z-[1] w-full h-full backdrop-blur-sm rounded-lg flex flex-col items-center justify-center gap-2 font-semibold"
          data-testid="formRequestErrorOutput"
          data-v-c0dd21dc=""
          style="display: none;"
        >
          <icon
            color="#ff0000"
            data-v-c0dd21dc=""
            name="material-symbols:warning-rounded"
            size="25%"
          />
          <div
            class="text-center"
            data-v-c0dd21dc=""
          >
            
            <p
              class="text-md"
              data-testid="errorTitle"
              data-v-c0dd21dc=""
            >
               Произошла непредвиденная ошибка 
            </p>
            <p
              class="text-xs"
              data-testid="errorDescription"
              data-v-c0dd21dc=""
            >
               Проверьте ваше интернет соединение 
            </p>
            
          </div>
          <button
            class="absolute top-3 right-3 w-[7.5%]"
            data-testid="closeButton"
            data-v-c0dd21dc=""
          >
            <icon
              data-v-c0dd21dc=""
              name="material-symbols:close-rounded"
              size="100%"
            />
          </button>
        </div>,
      }
    `);
  });
});
