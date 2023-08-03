import Beat from './Beat.vue';
import BeatMock from '@/testing/mocks/Beat.mock';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof Beat> = {
  component: Beat,
};

export default meta;

type Story = StoryObj<typeof Beat>;

export const Primary: Story = {
  render: (args) => ({
    components: { Beat },
    setup() {
      return { args };
    },
    template: '<Beat v-bind="args" />',
  }),
  args: {
    beat: BeatMock,
  },
};
