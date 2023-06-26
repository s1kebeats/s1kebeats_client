<template>
  <nav class="w-full flex flex-col items-start gap-3">
    <UiNavLink
      to="/"
      icon="material-symbols:home-outline-rounded"
      text="Главная"
    />
    <UiNavLink to="/authors" icon="mdi:account-music-outline" text="Авторы" />
    <UiNavLink
      to="/beats"
      icon="material-symbols:library-music-outline-rounded"
      text="Биты"
    />

    <!-- <template v-if="authStore.authorized"> -->
    <UiNavLink
      v-if="authStore.authorized"
      :to="`/${authStore.user!.username}`"
      icon="gg:profile"
      text="Профиль"
      data-testid="profileLink"
    />
    <!-- TODO: liked tracks functionality -->
    <!-- <UiNavLink
            to="/liked"
            icon="icon-park-outline:like"
            text="Понравившееся"
          />
    </template> -->
  </nav>
</template>
<script setup lang="ts">
import UiNavLink from './NavLink.vue';
import useAuthStore from '@/stores/auth';
const authStore = useAuthStore();
</script>
