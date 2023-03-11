<template>
  <div
    data-testid="profileOverlay"
    class="shadow select-none absolute z-[9999] right-0 top-11 bg-white rounded-md flex flex-col items-center gap-2 px-4 py-3"
    v-show="uiStore.profileOverlay"
  >
    <template v-if="authStore.authorized">
      <nuxt-link
        data-testid="profileLink"
        :to="`/${authStore.user!.username}`"
        class="w-full text-right text-sm text-black flex items-center justify-start gap-3 transition-all !hover:text-[#7945fc]"
      >
        <Icon name="gg:profile" size="18px" />
        <span> Профиль </span>
      </nuxt-link>
      <nuxt-link
        to="/liked"
        class="w-full text-right text-sm text-black flex items-center justify-start gap-3 transition-all !hover:text-[#7945fc]"
        data-testid="likedLink"
      >
        <Icon name="icon-park-outline:like" size="18px" />
        <span> Понравившееся </span>
      </nuxt-link>
      <LogoutButton data-testid="logoutButton" />
    </template>
    <nuxt-link
      v-else
      to="/login"
      data-testid="loginButton"
      class="w-full text-right text-sm font-medium flex items-center justify-start gap-3"
    >
      <Icon name="material-symbols:login-rounded" size="16px" />
      <span> Войти </span>
    </nuxt-link>
  </div>
</template>
<script setup lang="ts">
import LogoutButton from './LogoutButton.vue';
import useUiStore from '@/stores/ui';
import useAuthStore from '@/stores/auth';
const authStore = useAuthStore();
const uiStore = useUiStore();
</script>
<style lang="scss" scoped>
.shadow {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 3px;
}
</style>
