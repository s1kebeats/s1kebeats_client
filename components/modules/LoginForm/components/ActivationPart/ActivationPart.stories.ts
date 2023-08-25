import ActivationPart from './ActivationPart.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof ActivationPart> = {
  component: ActivationPart,
};

export default meta;

type Story = StoryObj<typeof ActivationPart>;

export const Primary: Story = {
  render: () => ({
    components: { ActivationPart },
    template: '<ActivationPart />',
  }),
};
