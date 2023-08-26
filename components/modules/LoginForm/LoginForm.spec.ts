import { VueWrapper, shallowMount } from '@vue/test-utils';
import LoginForm from './LoginForm.vue';
import { describe, it, expect, vi, Mock } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { LoginRequestBodyMock } from '@/mocks/requestBodies';
import { useAuthStore, useUiStore } from '@/stores';
import { createTestingPinia } from '@pinia/testing';
import flushPromises from 'flush-promises';

const loginPartSelector = '[data-testid=loginPart]';
const activationPartSelector = '[data-testid=activationPart]';

vi.stubGlobal('navigateTo', vi.fn());

describe('LoginForm', () => {
  beforeAll(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
  });
  beforeEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
  });
  describe('state', () => {
    it('mode - should render LoginPart visible by default', () => {
      const wrapper = shallowMount(LoginForm);
      expect(wrapper.get(loginPartSelector).attributes('style')).not.toBe(
        'display: none;'
      );
    });
    it('mode - should not render ActivationPart by default', () => {
      const wrapper = shallowMount(LoginForm);
      expect(wrapper.find(activationPartSelector).exists()).toBe(false);
    });
    it('error.state - should render loginPart with "errorState" attr set to "false" by default', () => {
      const wrapper = shallowMount(LoginForm);
      expect(wrapper.get(loginPartSelector).attributes('errorstate')).toBe(
        'false'
      );
    });
    it('error.status - should render loginPart without "errorStatus" attr set by default', () => {
      const wrapper = shallowMount(LoginForm);
      expect(wrapper.get(loginPartSelector).attributes()).not.toHaveProperty(
        'errorstatus'
      );
    });
    it('pending - should render loginPart with "apiSubmitting" attr set to "false" by default', () => {
      const wrapper = shallowMount(LoginForm);
      expect(wrapper.get(loginPartSelector).attributes('apisubmitting')).toBe(
        'false'
      );
    });
  });
  describe('User Interactions', () => {
    it('loginPart submit event with login success', async () => {
      const wrapper = shallowMount(LoginForm, {
        global: {
          plugins: [createTestingPinia()],
        },
      });
      const authStore = useAuthStore();
      const uiStore = useUiStore();

      await (wrapper.getComponent(loginPartSelector) as VueWrapper).vm.$emit(
        'submit',
        LoginRequestBodyMock
      );

      // should set LoginPart "apiSubmitting" attr to "true"
      expect(wrapper.get(loginPartSelector).attributes('apisubmitting')).toBe(
        'true'
      );

      // should call login with emitted data
      expect(authStore.login).toHaveBeenCalled();
      expect(authStore.login).toHaveBeenCalledWith(LoginRequestBodyMock);

      await flushPromises();

      // should not render activationPart
      expect(wrapper.find(activationPartSelector).exists()).toBe(false);

      // should keep loginPart visible
      expect(wrapper.get(loginPartSelector).attributes('style')).not.toBe(
        'display: none;'
      );

      // should call uiStore.setLoading with true
      expect(uiStore.setLoading).toHaveBeenCalled();
      expect(uiStore.setLoading).toHaveBeenCalledWith(true);

      // should call navigateTo with '/'
      expect(navigateTo).toHaveBeenCalled();
      expect(navigateTo).toHaveBeenCalledWith('/');

      await flushPromises();

      // should call uiStore.setLoading with false after timeout
      vi.runAllTimers();
      expect(uiStore.setLoading).toHaveBeenCalledTimes(2);
      expect(uiStore.setLoading).toHaveBeenCalledWith(false);
    });
    it('loginPart submit event with login failure without unauthorized error', async () => {
      const wrapper = shallowMount(LoginForm, {
        global: {
          plugins: [createTestingPinia()],
        },
      });
      const authStore = useAuthStore();
      const testStatus = 500;
      (authStore.login as Mock).mockRejectedValueOnce({
        response: {
          status: testStatus,
        },
      });
      const uiStore = useUiStore();

      await (wrapper.getComponent(loginPartSelector) as VueWrapper).vm.$emit(
        'submit',
        LoginRequestBodyMock
      );

      // should set LoginPart "apiSubmitting" attr to "true"
      expect(wrapper.get(loginPartSelector).attributes('apisubmitting')).toBe(
        'true'
      );

      // should call login with emitted data
      expect(authStore.login).toHaveBeenCalled();
      expect(authStore.login).toHaveBeenCalledWith(LoginRequestBodyMock);

      await flushPromises();

      // should not render activationPart
      expect(wrapper.find(activationPartSelector).exists()).toBe(false);

      // should keep loginPart visible
      expect(wrapper.get(loginPartSelector).attributes('style')).not.toBe(
        'display: none;'
      );

      // should set LoginPart "errorState" attr to "true"
      expect(wrapper.get(loginPartSelector).attributes('errorstate')).toBe(
        'true'
      );

      // should set LoginPart "errorstatus" attr to authStore.login response.status
      expect(wrapper.get(loginPartSelector).attributes('errorstatus')).toBe(
        testStatus.toString()
      );

      // should set LoginPart "apiSubmitting" attr to "false"
      expect(wrapper.get(loginPartSelector).attributes('apisubmitting')).toBe(
        'false'
      );

      // should not call uiStore.setLoading
      expect(uiStore.setLoading).not.toHaveBeenCalled();

      // should not call navigateTo
      expect(navigateTo).not.toHaveBeenCalled();
    });
    it('loginPart submit event with login failure with 403 error', async () => {
      const wrapper = shallowMount(LoginForm, {
        global: {
          plugins: [createTestingPinia()],
        },
      });
      const authStore = useAuthStore();
      (authStore.login as Mock).mockRejectedValueOnce({
        response: {
          status: 403,
        },
      });
      const uiStore = useUiStore();

      await (wrapper.getComponent(loginPartSelector) as VueWrapper).vm.$emit(
        'submit',
        LoginRequestBodyMock
      );

      // should set LoginPart "apiSubmitting" attr to "true"
      expect(wrapper.get(loginPartSelector).attributes('apisubmitting')).toBe(
        'true'
      );

      // should call login with emitted data
      expect(authStore.login).toHaveBeenCalled();
      expect(authStore.login).toHaveBeenCalledWith(LoginRequestBodyMock);

      await flushPromises();

      // should render activationPart
      expect(wrapper.find(activationPartSelector).exists()).toBe(true);

      // should not keep loginPart visible
      expect(wrapper.get(loginPartSelector).attributes('style')).toBe(
        'display: none;'
      );

      // should not set ActivationPart "errorState" attr to "true"
      expect(wrapper.get(activationPartSelector).attributes('errorstate')).toBe(
        'false'
      );

      // should not set ActivationPart "errorstatus" attr
      expect(
        wrapper.get(activationPartSelector).attributes()
      ).not.toHaveProperty('errorstatus');

      // should set LoginPart "apiSubmitting" attr to "false"
      expect(wrapper.get(loginPartSelector).attributes('apisubmitting')).toBe(
        'false'
      );

      // should not call uiStore.setLoading
      expect(uiStore.setLoading).not.toHaveBeenCalled();

      // should not call navigateTo
      expect(navigateTo).not.toHaveBeenCalled();
    });
    it('loginPart submit event with login failure with 403 error + activationPart submit with activation success', async () => {
      const wrapper = shallowMount(LoginForm, {
        global: {
          plugins: [createTestingPinia()],
        },
      });
      const authStore = useAuthStore();
      (authStore.login as Mock).mockRejectedValueOnce({
        response: {
          status: 403,
        },
      });
      const uiStore = useUiStore();

      await (wrapper.getComponent(loginPartSelector) as VueWrapper).vm.$emit(
        'submit',
        LoginRequestBodyMock
      );

      await flushPromises();

      const testActivatonCode = 'testActivatonCode';
      await (
        wrapper.getComponent(activationPartSelector) as VueWrapper
      ).vm.$emit('submit', testActivatonCode);

      // should set ActivationPart "apiSubmitting" attr to "true"
      expect(
        wrapper.get(activationPartSelector).attributes('apisubmitting')
      ).toBe('true');

      // should call activate with emitted data
      expect(authStore.activate).toHaveBeenCalled();
      expect(authStore.activate).toHaveBeenCalledWith(testActivatonCode);

      await flushPromises();

      // should call login with data emitted from loginPart
      expect(authStore.login).toHaveBeenCalled();
      expect(authStore.login).toHaveBeenCalledWith(LoginRequestBodyMock);

      await flushPromises();

      // should call uiStore.setLoading with true
      expect(uiStore.setLoading).toHaveBeenCalled();
      expect(uiStore.setLoading).toHaveBeenCalledWith(true);

      // should call navigateTo with '/'
      expect(navigateTo).toHaveBeenCalled();
      expect(navigateTo).toHaveBeenCalledWith('/');

      await flushPromises();

      // should call uiStore.setLoading with false after timeout
      vi.runAllTimers();
      expect(uiStore.setLoading).toHaveBeenCalledTimes(2);
      expect(uiStore.setLoading).toHaveBeenCalledWith(false);
    });
    it('loginPart submit event with login failure with 403 error + activationPart submit with activation failure', async () => {
      const wrapper = shallowMount(LoginForm, {
        global: {
          plugins: [createTestingPinia()],
        },
      });
      const authStore = useAuthStore();
      (authStore.login as Mock).mockRejectedValueOnce({
        response: {
          status: 403,
        },
      });
      const testStatus = 500;
      (authStore.activate as Mock).mockRejectedValueOnce({
        response: {
          status: testStatus,
        },
      });
      const uiStore = useUiStore();

      await (wrapper.getComponent(loginPartSelector) as VueWrapper).vm.$emit(
        'submit',
        LoginRequestBodyMock
      );

      await flushPromises();

      const testActivatonCode = 'testActivatonCode';
      await (
        wrapper.getComponent(activationPartSelector) as VueWrapper
      ).vm.$emit('submit', testActivatonCode);

      // should set ActivationPart "apiSubmitting" attr to "true"
      expect(
        wrapper.get(activationPartSelector).attributes('apisubmitting')
      ).toBe('true');

      // should call activate with emitted data
      expect(authStore.activate).toHaveBeenCalled();
      expect(authStore.activate).toHaveBeenCalledWith(testActivatonCode);

      await flushPromises();

      // should not call login 2nd time
      expect(authStore.login).toHaveBeenCalledTimes(1);

      // should set ActivationPart "errorState" attr to "true"
      expect(wrapper.get(activationPartSelector).attributes('errorstate')).toBe(
        'true'
      );

      // should set ActivationPart "errorStatus" attr to authStore.activate response.status
      expect(
        wrapper.get(activationPartSelector).attributes('errorstatus')
      ).toBe(testStatus.toString());

      // should set ActivationPart "apiSubmitting" attr to "false"
      expect(
        wrapper.get(activationPartSelector).attributes('apisubmitting')
      ).toBe('false');

      // should not call uiStore.setLoading
      expect(uiStore.setLoading).not.toHaveBeenCalled();

      // should not call navigateTo
      expect(navigateTo).not.toHaveBeenCalled();
    });
    it('loginPart submit event with login failure with 403 error + activationPart submit with activation sucess + login failure on second call', async () => {
      const wrapper = shallowMount(LoginForm, {
        global: {
          plugins: [createTestingPinia()],
        },
      });
      const authStore = useAuthStore();
      const testStatus = 403;
      (authStore.login as Mock).mockRejectedValue({
        response: {
          status: testStatus,
        },
      });
      const uiStore = useUiStore();

      await (wrapper.getComponent(loginPartSelector) as VueWrapper).vm.$emit(
        'submit',
        LoginRequestBodyMock
      );

      await flushPromises();

      const testActivatonCode = 'testActivatonCode';
      await (
        wrapper.getComponent(activationPartSelector) as VueWrapper
      ).vm.$emit('submit', testActivatonCode);

      // should set ActivationPart "apiSubmitting" attr to "true"
      expect(
        wrapper.get(activationPartSelector).attributes('apisubmitting')
      ).toBe('true');

      // should call activate with emitted data
      expect(authStore.activate).toHaveBeenCalled();
      expect(authStore.activate).toHaveBeenCalledWith(testActivatonCode);

      await flushPromises();

      // should call login 2nd time
      expect(authStore.login).toHaveBeenCalledTimes(2);

      // should set ActivationPart "errorState" attr to "true"
      expect(wrapper.get(activationPartSelector).attributes('errorstate')).toBe(
        'true'
      );

      // should set ActivationPart "errorStatus" attr to authStore.login response.status
      expect(
        wrapper.get(activationPartSelector).attributes('errorstatus')
      ).toBe(testStatus.toString());

      // should set ActivationPart "apiSubmitting" attr to "false"
      expect(
        wrapper.get(activationPartSelector).attributes('apisubmitting')
      ).toBe('false');

      // should not call uiStore.setLoading
      expect(uiStore.setLoading).not.toHaveBeenCalled();

      // should not call navigateTo
      expect(navigateTo).not.toHaveBeenCalled();
    });
  });
});
