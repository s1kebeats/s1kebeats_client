import { defineStore } from 'pinia';
import refresh from './api/refresh';
import type User from '@/api/models/User';
import logout from './api/logout';
import login from './api/login';
import activate from './api/activate';

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
      } catch (error) {
        this.setUser(null);
        this.setAuthorized(false);
        // throw error;
      }
    },
    async logout(): Promise<void> {
      try {
        await logout();
        this.setUser(null);
        this.setAuthorized(false);
      } catch (error) {
        // maybe create global error state
      }
    },
    async login(
      username: string,
      password: string,
      refresh: boolean
    ): Promise<void> {
      try {
        const { data } = await login(username, password, refresh);
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
