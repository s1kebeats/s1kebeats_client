import { defineStore } from 'pinia';
import activate from '../api/activate';

const useEmailActivationStore = defineStore('emailActivation', {
  state: (): {
    loading: boolean;
    error: {
      state: boolean;
      status: null | number;
    };
  } => {
    return {
      loading: true,
      error: {
        state: false,
        status: null,
      },
    };
  },
  actions: {
    async activate(activation: string) {
      try {
        await activate(activation);
      } catch (error: any) {
        this.error.state = true;
        this.error.status = error.response.status;
      } finally {
        this.loading = false;
      }
    },
  },
});

export default useEmailActivationStore;
