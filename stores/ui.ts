import { defineStore } from 'pinia';

const useUiStore = defineStore('ui', {
  state: (): {
    loading: boolean;
    overlay: boolean;
  } => {
    return {
      loading: true,
      overlay: false,
    };
  },
  actions: {
    toggleOverlay(): void {
      this.overlay = !this.overlay;
      if (this.overlay) {
        document
          .querySelector('body')!
          .classList.add('overflow-hidden', 'h-[100dvh]');
      } else {
        document
          .querySelector('body')!
          .classList.remove('overflow-hidden', 'h-[100dvh]');
      }
    },
    setOverlay(value: boolean): void {
      this.overlay = value;
      if (value) {
        document
          .querySelector('body')!
          .classList.add('overflow-hidden', 'h-[100dvh]');
      } else {
        document
          .querySelector('body')!
          .classList.remove('overflow-hidden', 'h-[100dvh]');
      }
    },
    setLoading(value: boolean): void {
      this.loading = value;
    },
  },
});

export default useUiStore;
