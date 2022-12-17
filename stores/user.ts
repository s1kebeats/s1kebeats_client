import { AxiosError, AxiosResponse } from 'axios';
import { defineStore } from 'pinia';
import { API_URL } from '~~/http';
import AuthService from '~~/services/AuthService';
import User from '../models/User';
import $api from '~~/http';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      accessToken: '',
      authorized: false,
      user: {} as User,
      loading: false,
    };
  },
  actions: {
    setAccessToken(accessToken: string, save: boolean) {
      this.accessToken = accessToken;
      if (save) {
        localStorage.setItem('accessToken', accessToken);
      }
    },
    setUser(user: User) {
      this.user = user;
    },
    setAuthorized(state: boolean) {
      this.authorized = state;
    },
    setLoading(state: boolean) {
      this.loading = state;
    },
    async login(
      username: string,
      password: string,
      save: boolean
    ): Promise<AxiosResponse> {
      try {
        const response = await AuthService.login(username, password);
        this.setAccessToken(response.data.accessToken, save);
        this.setAuthorized(true);
        this.setUser(response.data.user);
        return response;
      } catch (e) {
        const error = e as AxiosError;
        throw error;
      }
    },
    async register(
      username: string,
      email: string,
      password: string
    ): Promise<AxiosResponse> {
      try {
        const response = await AuthService.register(username, email, password);
        return response;
      } catch (e) {
        const error = e as AxiosError;
        throw error;
      }
    },
    async logout(): Promise<AxiosResponse> {
      try {
        const response = await AuthService.logout();
        this.setAccessToken('', true);
        this.setAuthorized(false);
        this.setUser({} as User);
        return response;
      } catch (e) {
        const error = e as AxiosError;
        throw error;
      }
    },
    async checkAuth(): Promise<AxiosResponse> {
      try {
        this.setLoading(true);
        const response = await $api.get(`/refresh`);
        this.setAccessToken(response.data.accessToken, true);
        this.setAuthorized(true);
        this.setUser(response.data.user);
        return response;
      } catch (e) {
        const error = e as AxiosError;
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
  },
});
