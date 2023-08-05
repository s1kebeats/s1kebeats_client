import AuthorIndividual from './AuthorIndividual.vue';
import AuthorIndividualMock from '@/testing/mocks/AuthorIndividual.mock';
import type { Meta, StoryObj } from '@storybook/vue3';
import BeatMock from '@/testing/mocks/Beat.mock';

const meta: Meta<typeof AuthorIndividual> = {
  component: AuthorIndividual,
};

export default meta;

type Story = StoryObj<typeof AuthorIndividual>;

export const Primary: Story = {
  render: (args) => ({
    components: { AuthorIndividual },
    setup() {
      return { args };
    },
    template: '<AuthorIndividual v-bind="args" />',
  }),
  args: {
    author: {
      ...AuthorIndividualMock,
      beats: Array.from({ length: 4 }, () => BeatMock),
    },
  },
};
