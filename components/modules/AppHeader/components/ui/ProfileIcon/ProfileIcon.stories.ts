import ProfileIcon from './ProfileIcon.vue';
import type { Meta } from '@storybook/vue3';

const meta: Meta<typeof ProfileIcon> = {
  component: ProfileIcon,
};

export default meta;

export const Primary = {
  render: () => ({
    components: { ProfileIcon },
    template: `
        <ProfileIcon />
    `,
  }),
};
