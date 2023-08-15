<template>
  <div class="w-[90%] md:w-[80%] flex flex-col gap-5 md:gap-7">
    <h1
      class="font-semibold text-3xl md:text-4xl text-center text-grayscale-header"
      data-testid="formTitle"
    >
      {{ title }}
    </h1>
    <form
      @submit.prevent="emit('submitForm')"
      class="relative flex flex-col gap-3"
      data-testid="form"
      @keydown.enter="emit('submitForm')"
    >
      <RequestErrorOutput
        :open="errorState"
        :status="errorStatus"
        @close="emit('closeError')"
        data-testid="formRequestErrorOutput"
      />
      <slot />
      <Button
        :class="{
          'focus:!outline-none': errorState,
        }"
        @click.prevent="emit('submitForm')"
        type="submit"
        size="sm"
        :loading="pending"
        data-testid="actionButton"
      >
        {{ buttonText }}
      </Button>
      <footer
        class="text-sm flex items-center justify-center gap-2"
        v-if="footerHint && footerLinkTitle && footerTo"
        data-testid="formFooter"
      >
        <span class="text-grayscale-header" data-testid="footerHint">
          {{ footerHint }}
        </span>
        <nuxt-link
          :to="footerTo"
          class="text-primary font-semibold transition-all hover:text-primary-default_strong"
          data-testid="footerLink"
        >
          {{ footerLinkTitle }}
        </nuxt-link>
      </footer>
    </form>
  </div>
</template>
<script setup lang="ts">
import RequestErrorOutput from '@/components/ui/RequestErrorOutput';
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
