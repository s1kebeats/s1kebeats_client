import AuthorInfo from './AuthorInfo.vue';
import AuthorIndividual from 'api/models/AuthorIndividual';
import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/vue3';

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

type Story = StoryObj<typeof AuthorInfo>;

export const Primary: Story = {
  render: (args) => ({
    components: { AuthorInfo },
    setup() {
      return { args };
    },
    template: '<AuthorInfo v-bind="args" />',
  }),
  args: {
    author: testAuthor,
    showEdit: false,
  },
};

export const WithEdit: Story = {
  render: (args) => ({
    components: { AuthorInfo },
    setup() {
      return { args };
    },
    template: '<AuthorInfo v-bind="args" />',
  }),
  args: {
    author: testAuthor,
    showEdit: true,
  },
};
