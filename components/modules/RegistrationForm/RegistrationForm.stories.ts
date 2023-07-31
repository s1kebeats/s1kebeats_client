import RegistrationForm from './RegistrationForm.vue';
import type { Meta } from '@storybook/vue3';

const meta: Meta<typeof RegistrationForm> = {
  component: RegistrationForm,
};

export default meta;

export const Primary = {
  render: () => ({
    components: { RegistrationForm },
    template: '<RegistrationForm />',
  }),
};
