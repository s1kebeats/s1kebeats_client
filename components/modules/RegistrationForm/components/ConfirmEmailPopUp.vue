<template>
  <transition name="popup">
    <div
      v-show="open"
      class="absolute z-[9999] w-full h-full backdrop-blur-sm rounded-lg flex flex-col items-center justify-center gap-2 font-semibold select-none"
      data-testid="confirmEmailPopup"
    >
      <Icon
        name="ic:sharp-alternate-email"
        color="#7945fc"
        size="50px"
      />
      <div class="flex flex-col gap-5">
          <p class="text-md">
            Подтвердите электронную почту
          </p>
          <!-- <UiButton class="w-full h-[36px]" @click.prevent="loginRedirect">Вход</UiButton> -->
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
const props = defineProps<{
  open: boolean;
}>();

async function loginRedirect() {
    await navigateTo('/login')
}
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
