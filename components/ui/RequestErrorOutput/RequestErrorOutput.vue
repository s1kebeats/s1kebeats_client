<template>
  <transition name="fade">
    <div
      v-show="open"
      class="absolute outline outline-2 outline-grayscale-bg z-[1] w-full h-full backdrop-blur-md rounded-lg flex flex-col items-center justify-center gap-2 p-4"
      data-testid="requestErrorOutput"
    >
      <Icon
        icon="material-symbols:warning-rounded"
        class="text-danger text-[65px] lg:text-[70px]"
      />
      <div class="text-center flex flex-col gap-2">
        <p class="text-md font-semibold" data-testid="errorTitle">
          {{
            status === 401
              ? unauthorizedErrorTitle
              : status === 400
              ? wrongActivationCodeTitle
              : unexpectedErrorTitle
          }}
        </p>
        <p
          class="text-sm"
          data-testid="errorDescription"
          v-if="status !== 401 && status !== 400"
        >
          Проверьте ваше интернет соединение
        </p>
      </div>
      <Button
        @click.prevent="close"
        data-testid="closeButton"
        class="absolute top-4 right-4"
        icon="material-symbols:close-rounded"
        size="xs"
      />
    </div>
  </transition>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Button } from '@s1kebeats/s1kebeats-ui';
import {
  unauthorizedErrorTitle,
  unexpectedErrorTitle,
  wrongActivationCodeTitle,
} from './errorTitles';

const props = defineProps<{
  open: boolean;
  status?: number | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const close = () => {
  emit('close');
};
</script>
