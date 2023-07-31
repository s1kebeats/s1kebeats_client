import Button from './Button.vue';
import type { Meta } from '@storybook/vue3';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

export const Primary = {
  render: () => ({
    components: { Button },
    template: '<Button> Button </Button>',
  }),
};
