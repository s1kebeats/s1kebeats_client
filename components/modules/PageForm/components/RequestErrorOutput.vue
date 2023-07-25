<template>
  <transition name="popup">
    <div
      v-show="open"
      class="absolute outline outline-2 z-[1] w-full h-full backdrop-blur-md rounded-lg flex flex-col items-center justify-center gap-2 p-3"
      data-testid="formRequestErrorOutput"
    >
      <Icon
        name="material-symbols:warning-rounded"
        class="text-danger"
        size="25%"
      />
      <div class="text-center flex flex-col gap-2">
        <template v-if="status === 401">
          <p class="desktop-text-md link" data-testid="errorTitle">
            Неверные данные для входа
          </p>
        </template>
        <template v-else>
          <p class="desktop-text-md link" data-testid="errorTitle">
            Произошла непредвиденная ошибка
          </p>
          <p class="desktop-text-xs" data-testid="errorDescription">
            Проверьте ваше интернет соединение
          </p>
        </template>
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
<style lang="scss" scoped>
.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.2s ease;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}
</style>
