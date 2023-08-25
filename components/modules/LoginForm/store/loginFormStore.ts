import { defineStore } from 'pinia';
import { type LoginRequestBody } from '@/api/models/requestBodies';

const useLoginFormStore = defineStore('loginForm', {
  state: (): {
    mode: 'login' | 'activation';
    credentials: LoginRequestBody;
  } => {
    return {
      mode: 'login',
      credentials: {} as LoginRequestBody,
    };
  },
  actions: {
    setMode(mode: 'login' | 'activation'): void {
      this.mode = mode;
    },
    setCredentials(credentials: LoginRequestBody): void {
      Object.assign(this.credentials, credentials);
    },
  },
});

export default useLoginFormStore;
