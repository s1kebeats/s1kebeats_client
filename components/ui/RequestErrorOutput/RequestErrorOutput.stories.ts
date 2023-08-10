import RequestErrorOutput from './RequestErrorOutput.vue';
import type { Meta } from '@storybook/vue3';

const meta: Meta<typeof RequestErrorOutput> = {
  component: RequestErrorOutput,
};

export default meta;

export const Primary = {
  render: () => ({
    components: { RequestErrorOutput },
    template: `<div class="flex flex-col gap-5 items-start">
    <div class="relative w-[320px] aspect-square">
      <RequestErrorOutput open="true" />
    </div>
    <div class="relative w-[320px] aspect-square">
      <RequestErrorOutput open="true" :status="401" />
    </div>
    <div class="relative w-[320px] aspect-square">
    <RequestErrorOutput open="true" :status="400" />
  </div>
  </div>`,
  }),
};
