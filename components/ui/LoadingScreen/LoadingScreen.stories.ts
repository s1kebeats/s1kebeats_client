import LoadingScreen from './LoadingScreen.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof LoadingScreen> = {
  component: LoadingScreen,
};

export default meta;

type Story = StoryObj<typeof LoadingScreen>;

export const Primary: Story = {
  render: () => ({
    components: { LoadingScreen },
    template: '<LoadingScreen />',
  }),
};
