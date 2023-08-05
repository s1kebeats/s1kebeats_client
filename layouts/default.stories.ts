import defaultLayout from './default.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof defaultLayout> = {
  component: defaultLayout,
};

export default meta;

type Story = StoryObj<typeof defaultLayout>;

export const Primary: Story = {
  render: () => ({
    components: { defaultLayout },
    template: '<defaultLayout />',
  }),
};
