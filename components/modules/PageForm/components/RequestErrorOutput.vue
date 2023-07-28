<template>
  <transition name="fade">
    <div
      v-show="open"
      class="absolute outline outline-2 z-[1] w-full h-full backdrop-blur-md rounded-lg flex flex-col items-center justify-center gap-2 p-3"
      data-testid="requestErrorOutput"
    >
      <Icon
        name="material-symbols:warning-rounded"
        class="text-danger"
        size="25%"
      />
      <div class="text-center flex flex-col gap-2">
        <p class="desktop-text-md link" data-testid="errorTitle">
          {{
            status === 401
              ? unauthorizedErrorTitle
              : status === 404
              ? wrongActivationCodeTitle
              : unexpectedErrorTitle
          }}
        </p>
        <p
          class="desktop-text-xs"
          data-testid="errorDescription"
          v-if="status !== 401 && status !== 404"
        >
          Проверьте ваше интернет соединение
        </p>
      </div>
      <button
        @click.prevent="close"
        data-testid="closeButton"
        class="absolute top-3 right-3 w-[7.5%]"
      >
        <Icon name="material-symbols:close-rounded" size="100%" />
      </button>
    </div>
  </transition>
</template>
<script setup lang="ts">
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
