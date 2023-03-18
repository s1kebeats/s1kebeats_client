import { defineStore } from 'pinia';
import BeatUpload from '@/api/models/BeatUpload';

const useUploadStore = defineStore('upload', {
  state: (): {
    beat: BeatUpload;
  } => {
    return {
      beat: {} as BeatUpload,
    };
  },
  actions: {},
});

export default useUploadStore;
