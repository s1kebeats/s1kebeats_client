<template>
  <div
    class="shadow select-none absolute z-[9999] right-0 top-11 bg-white rounded-md flex flex-col items-center gap-2 px-4 py-3"
    v-show="uiStore.profileOverlay"
  >
    <template v-if="authStore.authorized">
      <nuxt-link
        :to="`/${authStore.user!.username}`"
        class="w-full text-right text-sm text-black flex items-center justify-start gap-3 transition-all !hover:text-[#7945fc]"
      >
        <Icon name="gg:profile" size="18px" />
        <span> Профиль </span>
      </nuxt-link>
      <nuxt-link
        to="/liked"
        class="w-full text-right text-sm text-black flex items-center justify-start gap-3 transition-all !hover:text-[#7945fc]"
      >
        <Icon name="icon-park-outline:like" size="18px" />
        <span> Понравившееся </span>
      </nuxt-link>
      <UiLogoutButton />
    </template>
    <nuxt-link
      v-else
      to="/login"
      class="w-full text-right text-xs text-black font-bold flex items-center justify-start gap-3"
    >
      <Icon name="material-symbols:login-rounded" size="16px" />
      <span> Войти </span>
    </nuxt-link>
  </div>
</template>
<script setup lang="ts">
import useUiStore from '~~/stores/ui';
import useAuthStore from '~~/stores/auth';
const authStore = useAuthStore();
const uiStore = useUiStore();

const props = defineProps<{
  show: boolean;
}>();
</script>
<style lang="scss" scoped>
.shadow {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 3px;
}
</style>
