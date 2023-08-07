import type Beat from './Beat';

export default interface AuthorIndividual {
  id: number;
  username: string;
  createdAt: string;
  displayedName: string | null;
  about: string | null;
  image: string | null;
  beats: Beat[];
  youtube: string | null;
  instagram: string | null;
  vk: string | null;
  _count: {
    beats: number;
  };
}
