import { defineStore } from 'pinia';

const useSearchPanelStore = defineStore('searchPanel', {
  state: (): {
    type: 'tracks' | 'authors';
    panel: boolean;
  } => {
    return {
      type: 'tracks',
      panel: false,
    };
  },
  actions: {
    setType(type: typeof this.type) {
      this.type = type;
    },
    setPanel(value: typeof this.panel) {
      this.panel = value;
    },
    togglePanel() {
      this.panel = !this.panel;
    },
  },
});

export default useSearchPanelStore;
