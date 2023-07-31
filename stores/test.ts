import { defineStore } from 'pinia';

const useUiStore = defineStore('test', {
  state: (): {
    loading: boolean;
  } => {
    return {
      loading: true,
    };
  },
  actions: {
    setLoading(value: boolean): void {
      this.loading = value;
    },
  },
});

export default useUiStore;
