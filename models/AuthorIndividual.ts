import BeatForAuthor from './BeatForAuthor';

export default interface AuthorIndividual {
  username: string;
  displayedName: string | null;
  about: string | null;
  vk: string | null;
  youtube: string | null;
  instagram: string | null;
  image: string;
  beats: BeatForAuthor[];
  createdAt: Date;
  id: number;
  _count: {
    beats: number;
  };
}
