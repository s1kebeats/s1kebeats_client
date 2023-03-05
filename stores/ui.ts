import { defineStore } from 'pinia';

const useUiStore = defineStore('ui', {
  state: (): {
    loading: boolean;
    menuActive: boolean;
  } => {
    return {
      loading: true,
      menuActive: false,
    };
  },
  actions: {
    setMenuActive(value: boolean): void {
      this.menuActive = value;
    },
    setLoading(value: boolean): void {
      this.loading = value;
    },
  },
});

export default useUiStore;
