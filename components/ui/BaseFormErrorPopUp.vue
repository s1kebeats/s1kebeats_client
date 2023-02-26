<template>
  <transition name="popup">
    <div
      v-show="open"
      class="absolute z-[9999] w-full h-full backdrop-blur-sm rounded-lg flex flex-col items-center justify-center gap-2 font-semibold select-none"
    >
      <Icon
        name="material-symbols:warning-rounded"
        color="#ff0000"
        size="50px"
      />
      <div class="text-center">
        <template v-if="code === 403">
          <p class="text-md">Подтвердите электронную почту</p>
        </template>
        <template v-else-if="code === 401">
          <p class="text-md">Неверные данные для входа</p>
        </template>
        <template v-else>
          <p class="text-md">Произошла непредвиденная ошибка</p>
          <p class="text-xs">Проверьте ваше интернет соединение</p>
        </template>
      </div>
      <button
        @click.prevent="closePopUp"
        class="absolute top-[12px] right-[12px] flex items-center justify-center"
      >
        <Icon name="material-symbols:close-rounded" size="21px" />
      </button>
    </div>
  </transition>
</template>
<script setup lang="ts">
const props = defineProps<{
  open: boolean;
  code?: number | null;
}>();
const emit = defineEmits<{
  (e: 'close'): void;
}>();
const closePopUp = () => {
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
