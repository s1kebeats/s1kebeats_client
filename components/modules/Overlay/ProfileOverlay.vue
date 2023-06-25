<template>
  <div
    data-testid="profileOverlay"
    class="absolute z-[1] right-0 px-[3%] py-3 top-[64px] w-full h-[calc(100dvh-64px)] bg-white text-black flex"
    v-show="uiStore.profileOverlay"
  >
    <div class="w-full flex flex-col justify-between">
      <div class="w-full flex flex-col items-start gap-3">
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
      <div class="flex gap-[3%]">
        <template v-if="authStore.authorized">
          <UploadButton class="grow" />
          <LogoutButton data-testid="logoutButton" />
        </template>
        <template v-else>
          <LoginButton />
          <RegisterButton class="grow" />
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import LogoutButton from './ui/LogoutButton.vue';
import LoginButton from './ui/LoginButton.vue';
import RegisterButton from './ui/RegisterButton.vue';
import UploadButton from './ui/UploadButton.vue';
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
