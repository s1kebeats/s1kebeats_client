<template>
  <header
    class="relative h-[75px] flex items-center justify-between w-[1480px]"
  >
    <HeaderLogo />
    <HeaderSearch class="absolute left-0 right-0 mx-auto" />
    <div class="flex items-center gap-5">
      <HeaderNav />
      <nuxt-link
        v-if="userStore.authorized"
        to="/upload"
        class="bg-black text-white rounded-md p-2 text-xs transition-all flex items-center gap-2"
      >
        <Icon name="material-symbols:upload-rounded" size="16px" />
        Опубликовать
      </nuxt-link>
      <HeaderProfile />
    </div>
  </header>
</template>
<script setup lang="ts">
import { useUserStore } from '~~/stores/user';
const userStore = useUserStore();
</script>
