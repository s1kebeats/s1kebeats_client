import { faker } from '@faker-js/faker';
import AuthorIndividual from '@/api/models/AuthorIndividual';

const AuthorIndividualMock: AuthorIndividual = {
    id: faker.number.int({
        max: 999
    }),
    username: faker.internet.userName(),
    createdAt: faker.date.anytime().toLocaleString(),
    displayedName: faker.internet.displayName(),
    about: faker.lorem.sentence(),
    image: faker.image.avatar(),
    beats: [],
    youtube: faker.internet.userName(),
    instagram: faker.internet.userName(),
    vk: faker.internet.userName(),
    _count: {
        beats: 0
    }
}
const AuthorIndividualStaticMock: AuthorIndividual = {
    id: 1,
    username: 'username',
    createdAt: '2023-08-1',
    displayedName: 'displayed name',
    about: 'about',
    image: '/path/to/image',
    beats: [],
    youtube: '@username',
    instagram: '@username',
    vk: 'username',
    _count: {
        beats: 0
    }
}

export default AuthorIndividualMock;
export { AuthorIndividualStaticMock };