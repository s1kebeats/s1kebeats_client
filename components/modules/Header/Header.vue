<template>
  <header
    class="relative h-[75px] flex items-center justify-between w-[1480px] mb-5"
  >
    <UiLogo />
    <Search class="absolute left-0 right-0 mx-auto" />
    <div class="flex items-center gap-5">
      <UiNav />
      <nuxt-link
        v-if="authStore.authorized"
        to="/upload"
        class="bg-black text-white rounded-md p-2 text-xs transition-all flex items-center gap-2"
      >
        <Icon name="material-symbols:upload-rounded" size="1rem" />
        Опубликовать
      </nuxt-link>
      <Profile />
    </div>
  </header>
</template>
<script setup lang="ts">
import UiNav from './components/ui/Nav.vue';
import UiLogo from './components/ui/Logo.vue';
import Search from './components/Search.vue';
import Profile from './components/Profile.vue';
import useAuthStore from '@/stores/auth';

const authStore = useAuthStore();
</script>
