<template>
  <div class="w-full flex flex-col items-center justify-center gap-7">
    <h1 class="link desktop-display-xs" data-testid="formTitle">{{ title }}</h1>
    <form
      @submit.prevent="emit('submitForm')"
      class="relative flex flex-col w-full gap-3"
      data-testid="form"
    >
      <RequestErrorOutput
        :open="errorState"
        :status="errorStatus"
        @close="emit('closeError')"
        data-testid="formRequestErrorOutput"
      />
      <slot />
      <Button size="sm" :loading="pending" data-testid="actionButton">
        {{ buttonText }}
      </Button>
      <footer
        class="w-full desktop-text-xs flex items-center justify-center gap-2"
        v-if="footerHint && footerLinkTitle && footerTo"
        data-testid="formFooter"
      >
        <span class="text-black" data-testid="footerHint">
          {{ footerHint }}
        </span>
        <nuxt-link
          :to="footerTo"
          class="text-primary link transition-all hover:text-primary-default_strong"
          data-testid="footerLink"
        >
          {{ footerLinkTitle }}
        </nuxt-link>
      </footer>
    </form>
  </div>
</template>
<script setup lang="ts">
import RequestErrorOutput from './components/RequestErrorOutput.vue';
import { Button } from '@s1kebeats/s1kebeats-ui';

const props = defineProps<{
  title: string;
  pending: boolean;
  buttonText: string;
  footerHint?: string;
  footerLinkTitle?: string;
  footerTo?: string;
  errorState: boolean;
  errorStatus: number | null;
}>();

const emit = defineEmits<{
  (e: 'submitForm'): void;
  (e: 'closeError'): void;
}>();
</script>
