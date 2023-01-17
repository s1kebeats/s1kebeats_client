import Tag from './Tag';

export default interface Beat {
  id: number;
  name: string;
  bpm: number | null;
  image: string | null;
  mp3: string;
  wavePrice: number;
  user: {
    id: number;
    username: string;
    displayedName: string | null;
  };
}
