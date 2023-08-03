import AuthorBeats from './AuthorBeats.vue';
import BeatMock from '@/testing/mocks/Beat.mock';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof AuthorBeats> = {
  component: AuthorBeats,
};

export default meta;

type Story = StoryObj<typeof AuthorBeats>;

export const Primary: Story = {
  render: (args) => ({
    components: { AuthorBeats },
    setup() {
      return { args };
    },
    template: '<AuthorBeats v-bind="args" />',
  }),
  args: {
    beats: Array.from({ length: 4 }, () => BeatMock),
  },
};
