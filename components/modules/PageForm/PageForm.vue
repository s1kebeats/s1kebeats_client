<template>
  <div class="flex flex-col items-center justify-center gap-7">
    <h1 class="link desktop-display-xs" data-testid="formTitle">{{ title }}</h1>
    <form
      @submit.prevent="emit('submit')"
      class="relative flex flex-col w-full gap-3"
    >
      <RequestErrorOutput
        :open="errorState"
        :status="errorStatus"
        @close="emit('closeError')"
      />
      <slot />
      <Button size="sm" :loading="pending"> {{ buttonText }} </Button>
      <footer
        class="w-full desktop-text-xs flex items-center justify-center gap-2"
      >
        <span class="text-black">
          {{ footerHint }}
        </span>
        <nuxt-link
          :to="footerTo"
          class="text-primary link transition-all hover:text-primary-default_strong"
        >
          {{ footerLinkTitle }}
        </nuxt-link>
      </footer>
    </form>
  </div>
</template>
<script setup lang="ts">
import RequestErrorOutput from './components/RequestErrorOutput.vue'

const props = defineProps<{
  submitCallback: Function;
  title: string;
  pending: boolean;
  buttonText: string;
  footerHint?: string;
  footerLinkTitle?: string;
  footerTo?: string;
  errorState: boolean;
  errorStatus: number;
}>();

const emit = defineEmits<{
  (e: 'submit'): void;
  (e: 'closeError'): void;
}>();
</script>
