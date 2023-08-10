import ValidationErrorOutput from './ValidationErrorOutput.vue';
import type { Meta } from '@storybook/vue3';

const meta: Meta<typeof ValidationErrorOutput> = {
  component: ValidationErrorOutput,
};

export default meta;

export const Primary = {
  render: () => ({
    components: { ValidationErrorOutput },
    template: `
        <ValidationErrorOutput :errors="[ { $message: 'Wrong value' }, { $message: 'Fill required' } ]" />
    `,
  }),
};
