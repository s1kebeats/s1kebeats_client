import { AxiosResponse } from 'axios';
import { defineStore } from 'pinia';
import AuthService from '~~/services/AuthService';
import User from '../models/User';
import AuthResponse from '../models/AuthResponse';

export const useUserStore = defineStore('user', {
  state: (): {
    accessToken: string | null;
    authorized: boolean;
    user: User;
    loading: boolean;
  } => {
    return {
      accessToken: null,
      authorized: false,
      user: {} as User,
      loading: false,
    };
  },
  actions: {
    setAccessToken(accessToken: string | null) {
      if (accessToken) {
        this.accessToken = accessToken;
        localStorage.setItem('accessToken', accessToken);
      } else {
        this.accessToken = null;
        localStorage.removeItem('accessToken');
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
      rememberMe: boolean
    ): Promise<AxiosResponse<AuthResponse>> {
      try {
        const response = await AuthService.login(
          username,
          password,
          rememberMe
        );
        this.setAccessToken(response.data.accessToken);
        this.setUser(response.data.user);
        this.setAuthorized(true);

        return response;
      } catch (e: any) {
        throw e;
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
      } catch (e: any) {
        throw e;
      }
    },
    async logout(): Promise<AxiosResponse> {
      try {
        const response = await AuthService.logout();

        this.setAccessToken(null);
        this.setAuthorized(false);
        this.setUser({} as User);

        return response;
      } catch (e: any) {
        throw e;
      }
    },
    async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
      try {
        this.setLoading(true);

        const response = await AuthService.refresh();

        this.setAccessToken(response.data.accessToken);
        this.setUser(response.data.user);
        this.setAuthorized(true);

        return response;
      } catch (e: any) {
        throw e;
      } finally {
        this.setLoading(false);
      }
    },
  },
});
