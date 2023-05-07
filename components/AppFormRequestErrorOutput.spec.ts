import { describe, expect, it } from 'vitest';
import FormRequestErrorOutput from './FormRequestErrorOutput.vue';
import { mount } from '@vue/test-utils';

const errorPopupSelector = '[data-testid=errorPopup]';
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
      const wrapper = mount(FormRequestErrorOutput, {
        props: {
          open: false
        }
      });
  
      expect(wrapper.get(errorPopupSelector).isVisible()).toBe(false);
    });
    it('open - should render visible when set to true', () => {
      const wrapper = mount(FormRequestErrorOutput, {
        props: {
          open: true
        }
      });
  
      expect(wrapper.get(errorPopupSelector).isVisible()).toBe(true);
    });
    it('status - should render unexpected error output with description, without prop provided', () => {
      const wrapper = mount(FormRequestErrorOutput, defaultMountOptions);
  
      expect(wrapper.get(errorTitleSelector).text()).toBe(
        'Произошла непредвиденная ошибка'
      );
      expect(wrapper.find(errorDescriptionSelector).exists()).toBe(true)
      expect(wrapper.get(errorDescriptionSelector).text()).toBe(
        'Проверьте ваше интернет соединение'
      );
    });
    it('status - should render wrong login credentials error output without description, when set to 401', () => {
      const wrapper = mount(FormRequestErrorOutput, {
        props: {
          open: true,
          status: 401,
        },
      });
  
      expect(wrapper.get(errorTitleSelector).text()).toBe(
        'Неверные данные для входа'
      );
      expect(wrapper.find(errorDescriptionSelector).exists()).toBe(false)
    });
    it('status - should render confirm email error output without description, when set to 403', () => {
      const wrapper = mount(FormRequestErrorOutput, {
        props: {
          open: true,
          status: 403,
        },
      });
  
      expect(wrapper.get(errorTitleSelector).text()).toBe(
        'Подтвердите электронную почту'
      );
      expect(wrapper.find(errorDescriptionSelector).exists()).toBe(false)
    });
  })
  describe('User Interactions', () => {
    it('click - should emit close event', async () => {
      const wrapper = mount(FormRequestErrorOutput, defaultMountOptions);
  
      await wrapper.get(closeButtonSelector).trigger('click');
      expect(wrapper.emitted()).toHaveProperty('close');
      expect(wrapper.emitted('close')).toHaveLength(1);
    });
  })

});
