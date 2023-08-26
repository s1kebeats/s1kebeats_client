import ActivationPart from './ActivationPart.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof ActivationPart> = {
  parameters: {
    layout: 'centered',
  },
  decorators: [
    () => ({
      template:
        '<div class="w-[576px] flex items-center justify-center"><story/></div>',
    }),
  ],
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
