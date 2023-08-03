import { faker } from '@faker-js/faker';
import Beat from '@/api/models/Beat';

const BeatMock: Beat = {
  id: faker.number.int({
    max: 999,
  }),
  name: faker.word.words(2),
  bpm: faker.number.int({
    min: 50,
    max: 220,
  }),
  image: faker.image.urlLoremFlickr({ category: 'abstract' }),
  mp3: '/path/to/mp3',
  wavePrice: faker.number.int({
    min: 399,
    max: 3999,
  }),
  stemsPrice: faker.number.int({
    min: 5000,
    max: 12000,
  }),
  user: {
    username: faker.internet.userName(),
    id: faker.number.int({
      max: 999,
    }),
    displayedName: faker.internet.displayName(),
  },
  tags: Array.from(
    {
      length: 4,
    },
    () => ({
      name: faker.word.adjective(),
      id: faker.number.int({
        max: 999,
      }),
    })
  ),
};
const BeatStaticMock: Beat = {
  id: 1,
  name: 'name',
  bpm: 140,
  image: '/path/to/image',
  mp3: '/path/to/mp3',
  wavePrice: 999,
  stemsPrice: 2999,
  user: {
    username: 'username',
    id: 0,
    displayedName: 'displayed name',
  },
  tags: [],
};

export default BeatMock;
export { BeatStaticMock };
