export default interface BeatUpload {
  name: string;
  bpm: number | null;
  description: string;
  wavePrice: number | null;
  stemsPrice: number | null;
  wav: File | null;
  mp3: File | null;
  stems: File | null;
  image: File | null;
}
