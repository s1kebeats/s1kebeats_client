import PageForm from './PageForm.vue';
import type { Meta } from '@storybook/vue3';
import { ConfidentialInput, UsernameInput } from '@s1kebeats/s1kebeats-ui';

const meta: Meta<typeof PageForm> = {
  component: PageForm,
};

export default meta;

export const Primary = {
  render: () => ({
    components: { PageForm, ConfidentialInput, UsernameInput },
    template: `
      <div class="flex items-center justify-center">
        <PageForm
          title="Title"
          :pending="false"
          button-text="Submit"
          footer-hint="What's up?"
          footer-link-title="Get it"
          footer-to="/layout"
          :error-state="false"
          :error-status="null"
        >
          ...
        </PageForm>
      </div>
    `,
  }),
};
