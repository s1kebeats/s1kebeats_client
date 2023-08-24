import { defineStore } from 'pinia';
import type User from '@/api/models/User';
import { refresh, logout, login, activate } from './api';
import { showUnexpectedError } from '@/composables';
import { LoginRequestBody } from '@/api/models/requestBodies';

const useAuthStore = defineStore('auth', {
  state: (): {
    authorized: boolean | null;
    user: User | null;
  } => {
    return {
      authorized: null,
      user: null,
    };
  },
  actions: {
    setUser(user: User | null): void {
      if (this.user != null && user != null) {
        Object.assign(this.user, user);
      } else {
        this.user = user;
      }
    },
    setAuthorized(authorized: boolean): void {
      this.authorized = authorized;
    },
    async checkAuth(): Promise<void> {
      try {
        const { data } = await refresh();
        this.setUser(data.user);
        this.setAuthorized(true);
      } catch (error: any) {
        this.setUser(null);
        this.setAuthorized(false);
        if (error.response?.status !== 401) {
          showUnexpectedError(error);
        }
      }
    },
    async logout(): Promise<void> {
      try {
        await logout();
        this.setUser(null);
        this.setAuthorized(false);
      } catch (error) {
        showUnexpectedError(error);
      }
    },
    async login(credentials: LoginRequestBody): Promise<void> {
      try {
        const { data } = await login(credentials);
        this.setUser(data.user);
        this.setAuthorized(true);
      } catch (error) {
        this.setAuthorized(false);
        throw error;
      }
    },
    async activate(activationCode: string): Promise<void> {
      try {
        await activate(activationCode);
      } catch (error) {
        throw error;
      }
    },
  },
});

export default useAuthStore;
