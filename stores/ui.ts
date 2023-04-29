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
      // if (this.profileOverlay) {
      //   document.querySelector('body')!.classList.add('overflow-hidden')
      //   document.querySelector('body')!.classList.add('h-[100vh]')
      // } else {
      //   document.querySelector('body')!.classList.remove('overflow-hidden')
      //   document.querySelector('body')!.classList.remove('h-[100vh]')
      // }
    },
    setProfileOverlay(value: boolean): void {
      this.profileOverlay = value;
      // if (value) {
      //   document.querySelector('body')!.classList.add('overflow-hidden')
      //   document.querySelector('body')!.classList.add('h-[100vh]')
      // } else {
      //   document.querySelector('body')!.classList.remove('overflow-hidden')
      //   document.querySelector('body')!.classList.remove('h-[100vh]')
      // }
    },
    setLoading(value: boolean): void {
      this.loading = value;
    },
  },
});

export default useUiStore;
