<template>
  <header class="header">
    <nuxt-link to="/">
      <UiLogo class="w-[54px]" alt="s1kebeats" />
    </nuxt-link>
    <Search />
    <div class="flex items-center gap-5">
      <!-- <UiNav /> -->
      <!-- <nuxt-link
        v-if="authStore.authorized"
        to="/upload"
        class="bg-black text-white rounded-md p-2 text-xs transition-all flex items-center gap-2"
      >
        <Icon name="material-symbols:upload-rounded" size="1rem" />
        Опубликовать
      </nuxt-link> -->
      <Profile />
    </div>
  </header>
</template>
<script setup lang="ts">
import UiNav from './components/ui/Nav.vue';
import Search from './components/Search.vue';
import Profile from './components/Profile.vue';
import useAuthStore from '@/stores/auth';

const authStore = useAuthStore();
</script>
<style lang="scss">
.header {
  position: relative;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 3%;
  // padding-inline: 0.75rem;
}
</style>
