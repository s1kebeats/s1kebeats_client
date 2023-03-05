import { defineStore } from 'pinia';
import refresh from './api/refresh';
import User from '@/api/models/User';

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
      if (this.user && user) {
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
        this.setAuthorized(false);
      }
    },
  },
});

export default useAuthStore;
