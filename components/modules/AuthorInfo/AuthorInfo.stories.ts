import AuthorInfo from './AuthorInfo.vue';
import AuthorIndividual from 'api/models/AuthorIndividual';
import { faker } from '@faker-js/faker';
import type { Meta } from '@storybook/vue3';

const meta: Meta<typeof AuthorInfo> = {
  component: AuthorInfo,
};

export default meta;

const testAuthor: AuthorIndividual = {
  id: 0,
  username: 's1kebeats',
  createdAt: '2023-07-29',
  displayedName: null,
  about:
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id est ipsam consectetur, alias placeat et voluptatum laboriosam neque, quibusdam dolore amet! Eveniet magnam cumque velit, explicabo incidunt consectetur aspernatur obcaecati!',
  image: faker.image.avatar(),
  youtube: '@s1kebeats',
  instagram: '@s1kebeats',
  vk: '@s1kebeats',
  _count: {
    beats: 0,
  },
  beats: [],
};

// export const Primary = {
//   render: () => ({
//     components: { AuthorInfo },
//     template: '<AuthorInfo :author="testAuthor" />',
//   }),
// };

export const Primary = {
  render: (args) => ({
    components: { AuthorInfo },
    setup() {
      return { args };
    },
    template: '<AuthorInfo v-bind="args" />',
  }),
  args: {
    author: testAuthor,
    edit: false
  }
};