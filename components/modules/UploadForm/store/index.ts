import { defineStore } from 'pinia';
import type BeatUpload from '@/api/models/BeatUpload';
import uploadMedia from '../api/uploadMedia';
import upload from '../api/upload';

const useUploadStore = defineStore('upload', {
  state: (): {
    beat: BeatUpload;
    uploadVersion: 'default' | 'extended' | null;
    page: number;
    error: {
      state: boolean;
      status: null | number;
      message: null | string;
    };
  } => {
    return {
      beat: {} as BeatUpload,
      uploadVersion: null,
      page: 1,
      error: {
        state: false,
        status: null,
        message: null,
      },
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
    setBeatField(field: keyof BeatUpload, value: any) {
      this.beat[field] = value;
    },
    setBeatData(data: Omit<BeatUpload, 'wave' | 'mp3' | 'image' | 'stems'>) {
      Object.assign(this.beat, data);
    },
    async updateBeatMedia(
      field: 'stems' | 'image' | 'wave' | 'mp3',
      media: File
    ) {
      try {
        const url = await uploadMedia(field, media);
        this.setBeatField(field, url);
      } catch (error: any) {
        this.setError(error);
      }
    },
    setError(error: any) {
      this.error.state = true;
      this.error.message = error.response.body ?? null;
      this.error.status = error.response.status ?? null;
    },
    async upload(data: Omit<BeatUpload, 'wave' | 'mp3' | 'image' | 'stems'>) {
      this.setBeatData(data);
      const filtered = Object.fromEntries(
        Object.entries(this.beat).filter(([key, value]) => !!value)
      );
      await upload(filtered);
    },
    resetState() {
      this.page = 1;
      this.uploadVersion = null;
      this.beat = {} as BeatUpload;
      this.error = {
        state: false,
        status: null,
        message: null,
      };
    },
  },
});

export default useUploadStore;
