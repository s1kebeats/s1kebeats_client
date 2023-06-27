import type { Meta, StoryObj } from '@storybook/vue3';

import EmailActivation from './EmailActivation.vue';

const meta: Meta<typeof EmailActivation> = {
  component: EmailActivation,
};

export default meta;

type Story = StoryObj<typeof EmailActivation>;

export const Loading: Story = {
  render: (args) => ({
    components: { EmailActivation },
    setup() {
      return { args };
    },
    template: '<EmailActivation v-bind="args" />',
  }),
  args: {},
};
