import AuthorInfo from './AuthorInfo.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import AuthorIndividualMock from '@/testing/mocks/AuthorIndividual.mock';

const meta: Meta<typeof AuthorInfo> = {
  component: AuthorInfo,
};

export default meta;

type Story = StoryObj<typeof AuthorInfo>;

export const Primary: Story = {
  render: (args) => ({
    components: { AuthorInfo },
    setup() {
      return { args };
    },
    template: '<AuthorInfo v-bind="args" />',
  }),
  args: {
    author: AuthorIndividualMock,
    showEdit: false,
  },
};

export const WithEdit: Story = {
  render: (args) => ({
    components: { AuthorInfo },
    setup() {
      return { args };
    },
    template: '<AuthorInfo v-bind="args" />',
  }),
  args: {
    author: AuthorIndividualMock,
    showEdit: true,
  },
};
