<template>
  <div
    data-testid="profileOverlay"
    class="absolute z-[1] right-0 top-[64px] w-full h-[calc(100vh-64px)] bg-[rgba(255,255,255,1)] text-black flex"
    v-show="uiStore.profileOverlay"
  >
    <div class="m-auto flex flex-col items-center gap-3">
      <div class="flex flex-col items-start gap-2">
        <HeaderUiMenuLink
          to="/"
          icon="material-symbols:home-outline-rounded"
          text="Главная"
        />
        <HeaderUiMenuLink
          to="/authors"
          icon="mdi:account-music-outline"
          text="Авторы"
        />
        <HeaderUiMenuLink
          to="/beats"
          icon="material-symbols:library-music-outline-rounded"
          text="Биты"
        />

        <template v-if="authStore.authorized">
          <HeaderUiMenuLink
            :to="`/${authStore.user!.username}`"
            icon="gg:profile"
            text="Профиль"
          />
          <HeaderUiMenuLink
            to="/liked"
            icon="icon-park-outline:like"
            text="Понравившееся"
          />
        </template>
        
      </div>
      <LoginButton v-if="!authStore.authorized" />
      <LogoutButton v-if="authStore.authorized" data-testid="logoutButton" />
    </div>
  </div>
</template>
<script setup lang="ts">
import LogoutButton from './LogoutButton.vue';
import LoginButton from './LoginButton.vue';
import HeaderUiNav from './ui/Nav.vue';
import HeaderUiMenuLink from './ui/MenuLink.vue';
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
