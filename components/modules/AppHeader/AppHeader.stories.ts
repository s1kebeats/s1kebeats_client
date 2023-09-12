import AppHeader from './AppHeader.vue';
import type { Meta } from '@storybook/vue3';

const meta: Meta<typeof AppHeader> = {
  component: AppHeader,
};

export default meta;

export const Primary = {
  render: () => ({
    components: { AppHeader },
    template: `
        <AppHeader />
    `,
  }),
};
