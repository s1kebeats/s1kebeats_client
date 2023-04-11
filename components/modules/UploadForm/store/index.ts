import { defineStore } from 'pinia';
import type BeatUpload from '@/api/models/BeatUpload';
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
    setBeatField(field: keyof BeatUpload, value: any) {
      this.beat[field] = value;
    },
    setBeatData(data: BeatUpload) {
      Object.assign(this.beat, data);
    },
    async updateBeatMedia(
      field: 'stems' | 'image' | 'wave' | 'mp3',
      media: File
    ) {
      try {
        const url = await uploadMedia(field, media);
        this.setBeatField(field, url);
      } catch (error) {
        this.error = true;
      }
    },
    async upload(data: BeatUpload) {
      this.setBeatData(data);
      const filtered = Object.fromEntries(
        Object.entries(this.beat).filter(([key, value]) => !!value)
      );
      await upload(filtered);
    },
  },
});

export default useUploadStore;
