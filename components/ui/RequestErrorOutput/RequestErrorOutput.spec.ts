import RequestErrorOutput from './RequestErrorOutput.vue';
import {
  unauthorizedErrorTitle,
  unexpectedErrorTitle,
  wrongActivationCodeTitle,
} from './errorTitles';
import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';

const requestErrorOutputSelector = '[data-testid=requestErrorOutput]';
const errorDescriptionSelector = '[data-testid=errorDescription]';
const errorTitleSelector = '[data-testid=errorTitle]';
const closeButtonSelector = '[data-testid=closeButton]';

describe('RequestErrorOutput', () => {
  describe('props', () => {
    it('open - should not be visible when set to "false"', () => {
      const wrapper = shallowMount(RequestErrorOutput, {
        props: {
          open: false,
        },
      });

      expect(wrapper.get(requestErrorOutputSelector).attributes('style')).toBe(
        'display: none;'
      );
    });
    it('open - should be visible when set to "true"', () => {
      const wrapper = shallowMount(RequestErrorOutput, {
        props: {
          open: true,
        },
      });

      expect(
        wrapper.get(requestErrorOutputSelector).attributes('style')
      ).not.toBe('display: none;');
    });
    it('status - should render unauthorizedErrorTitle when set to "401"', () => {
      const wrapper = shallowMount(RequestErrorOutput, {
        props: {
          open: true,
          status: 401,
        },
      });

      expect(wrapper.get(errorTitleSelector).text()).toBe(
        unauthorizedErrorTitle
      );
    });
    it('status - should render wrongActivationCodeTitle when set to "400"', () => {
      const wrapper = shallowMount(RequestErrorOutput, {
        props: {
          open: true,
          status: 400,
        },
      });

      expect(wrapper.get(errorTitleSelector).text()).toBe(
        wrongActivationCodeTitle
      );
    });
    it('status - should render unexpectedErrorTitle when set to anything except "400" and "401"', () => {
      const wrapper = shallowMount(RequestErrorOutput, {
        props: {
          open: true,
          status: 500,
        },
      });

      expect(wrapper.get(errorTitleSelector).text()).toBe(unexpectedErrorTitle);
    });
    it('status - should not render errorDescription when set to "400"', () => {
      const wrapper = shallowMount(RequestErrorOutput, {
        props: {
          open: true,
          status: 400,
        },
      });

      expect(wrapper.find(errorDescriptionSelector).exists()).toBe(false);
    });
    it('status - should not render errorDescription when set to "401"', () => {
      const wrapper = shallowMount(RequestErrorOutput, {
        props: {
          open: true,
          status: 401,
        },
      });

      expect(wrapper.find(errorDescriptionSelector).exists()).toBe(false);
    });
    it('status - should render errorDescription when set to anything except "400" and "401"', () => {
      const wrapper = shallowMount(RequestErrorOutput, {
        props: {
          open: true,
          status: 500,
        },
      });

      expect(wrapper.find(errorDescriptionSelector).exists()).toBe(true);
    });
  });
  describe('User Interactions', () => {
    it('closeButton click - should emit "close" event', async () => {
      const wrapper = shallowMount(RequestErrorOutput, {
        props: {
          open: true,
        },
      });
      await wrapper.get(closeButtonSelector).trigger('click');

      expect(wrapper.emitted()).toHaveProperty('close');
      expect(wrapper.emitted('close')).toHaveLength(1);
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(RequestErrorOutput, {
      props: {
        open: true,
      },
    });
    expect(wrapper.element).toMatchInlineSnapshot(`
      <transition-stub
        appear="false"
        css="true"
        name="fade"
        persisted="true"
      >
        <div
          class="absolute outline outline-2 outline-grayscale-bg z-[1] w-full h-full backdrop-blur-md rounded-lg flex flex-col items-center justify-center gap-2 p-4"
          data-testid="requestErrorOutput"
        >
          <anonymous-stub
            class="text-danger text-[65px] lg:text-[70px]"
            icon="material-symbols:warning-rounded"
          />
          <div
            class="text-center flex flex-col gap-2"
          >
            <p
              class="text-md font-semibold"
              data-testid="errorTitle"
            >
              Произошла непредвиденная ошибка
            </p>
            <p
              class="text-sm"
              data-testid="errorDescription"
            >
               Проверьте ваше интернет соединение 
            </p>
          </div>
          <button-stub
            class="absolute top-4 right-4"
            data-testid="closeButton"
            icon="material-symbols:close-rounded"
            loading="false"
            position="left"
            size="xs"
            type="button"
            uitype="primary"
          />
        </div>
      </transition-stub>
    `);
  });
});
