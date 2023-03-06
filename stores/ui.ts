import { defineStore } from 'pinia';

const useUiStore = defineStore('ui', {
  state: (): {
    loading: boolean;
    profileOverlay: boolean;
  } => {
    return {
      loading: true,
      profileOverlay: false,
    };
  },
  actions: {
    toggleProfileOverlay(): void {
      this.profileOverlay = !this.profileOverlay;
    },
    setProfileOverlay(value: boolean): void {
      this.profileOverlay = value;
    },
    setLoading(value: boolean): void {
      this.loading = value;
    },
  },
});

export default useUiStore;
