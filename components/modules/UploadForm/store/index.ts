import { defineStore } from 'pinia';
import BeatUpload from '@/api/models/BeatUpload';

const useUploadStore = defineStore('upload', {
  state: (): {
    beat: BeatUpload;
    uploadVersion: 'default' | 'extended' | null;
    page: number;
  } => {
    return {
      beat: {} as BeatUpload,
      uploadVersion: null,
      page: 1,
    };
  },
  actions: {
    setPage(value: number) {
      this.page = value;
    },
    setUploadVersion(value: typeof this.uploadVersion) {
      this.uploadVersion = value;
    },
    incrementPage() {
      this.page++;
    },
    decrementPage() {
      this.page--;
    },
  },
});

export default useUploadStore;
