import LoadingSpinner from './LoadingSpinner.vue';
import { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof LoadingSpinner> = {
  component: LoadingSpinner,
};
export default meta;
type Story = StoryObj<typeof LoadingSpinner>;

export const FirstStory: Story = {
  args: {},
};
