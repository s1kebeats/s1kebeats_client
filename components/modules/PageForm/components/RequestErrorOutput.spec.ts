import RequestErrorOutput from './RequestErrorOutput.vue';
import { unauthorizedErrorTitle, unexpectedErrorTitle } from './errorTitles';
import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';

const requestErrorOutputSelector = '[data-testid=requestErrorOutput]';
const errorDescriptionSelector = '[data-testid=errorDescription]';
const errorTitleSelector = '[data-testid=errorTitle]';

describe('RequestErrorOutput', () => {
  describe('props', () => {
    it('open - should not be visible when set to "false"', () => {
      const wrapper = shallowMount(RequestErrorOutput, {
        props: {
          open: false,
          status: null,
        },
      });
      expect(wrapper.get(requestErrorOutputSelector).isVisible()).toBe(false);
    });
    it('open - should be visible when set to "true"', () => {
      const wrapper = shallowMount(RequestErrorOutput, {
        props: {
          open: true,
          status: null,
        },
      });
      expect(wrapper.get(requestErrorOutputSelector).isVisible()).toBe(true);
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
    it('status - should render unauthorized errorTitle text when set to "401"', () => {
      const wrapper = shallowMount(RequestErrorOutput, {
        props: {
          open: true,
          status: 401,
        },
      });
      expect(wrapper.find(errorTitleSelector).text()).toBe(
        unauthorizedErrorTitle
      );
    });
    it('status - should render unexpected errorTitle text when set to anything except "401"', () => {
      const wrapper = shallowMount(RequestErrorOutput, {
        props: {
          open: true,
          status: 500,
        },
      });
      expect(wrapper.find(errorTitleSelector).text()).toBe(
        unexpectedErrorTitle
      );
    });
    it('status - should not render errorDescription when set to anything except "401"', () => {
      const wrapper = shallowMount(RequestErrorOutput, {
        props: {
          open: true,
          status: 500,
        },
      });
      expect(wrapper.find(errorDescriptionSelector).exists()).toBe(true);
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(RequestErrorOutput, {
      props: {
        open: true,
        status: 500,
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
          class="absolute outline outline-2 z-[1] w-full h-full backdrop-blur-md rounded-lg flex flex-col items-center justify-center gap-2 p-3"
          data-testid="requestErrorOutput"
        >
          <icon
            class="text-danger"
            name="material-symbols:warning-rounded"
            size="25%"
          />
          <div
            class="text-center flex flex-col gap-2"
          >
            <p
              class="desktop-text-md link"
              data-testid="errorTitle"
            >
              Произошла непредвиденная ошибка
            </p>
            <p
              class="desktop-text-xs"
              data-testid="errorDescription"
            >
               Проверьте ваше интернет соединение 
            </p>
          </div>
          <button
            class="absolute top-3 right-3 w-[7.5%]"
            data-testid="closeButton"
          >
            <icon
              name="material-symbols:close-rounded"
              size="100%"
            />
          </button>
        </div>
      </transition-stub>
    `);
  });
});
