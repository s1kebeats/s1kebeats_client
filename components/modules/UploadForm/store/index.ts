import { defineStore } from 'pinia';
import BeatUpload from '@/api/models/BeatUpload';
import uploadMedia from '../api/uploadMedia';
import upload from '../api/upload';

const useUploadStore = defineStore('upload', {
  state: (): {
    beat: BeatUpload;
    uploadVersion: 'default' | 'extended' | null;
    page: number;
    error: boolean;
  } => {
    return {
      beat: {} as BeatUpload,
      uploadVersion: null,
      page: 1,
      error: false,
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
    // TODO: type inference
    setBeatInfo(field: keyof BeatUpload, value: any) {
      this.beat[field] = value;
    },
    async updateBeatMedia(
      field: 'stems' | 'image' | 'wave' | 'mp3',
      media: File
    ) {
      try {
        const url = await uploadMedia(field, media);
        this.setBeatInfo(field, url);
      } catch (error) {
        this.error = true;
      }
    },
    async upload(data: {
      name: string;
      wavePrice: number;
      stemsPrice: number;
      bpm: number;
      description: string;
    }) {
      for (const field in data) {
        this.setBeatInfo(field as keyof BeatUpload, data[field]);
      }

      await upload(this.beat)
    },
  },
});

export default useUploadStore;
