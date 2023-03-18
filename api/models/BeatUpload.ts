export default interface BeatUpload {
  name: string;
  wavePrice: number;
  wave: File;
  mp3: File;
  image: File;
  stems: File;
  stemsPrice: number;
  description?: string;
  bpm?: number;
}
