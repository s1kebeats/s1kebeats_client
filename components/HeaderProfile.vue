<template>
  <nuxt-link
    :to="userStore.authorized ? `/${userStore.user.username}` : '/register'"
  >
    <Icon
      v-if="!userStore.user.image"
      name="ic:round-account-circle"
      color="#e5e7eb"
      size="32px"
    />
    <BaseApiImage
      v-else
      :src="userStore.user.image"
      class="rounded-full border-[1px] w-[32px] h-[32px]"
      width="32px"
      height="32px"
      alt="Profile Image"
    />
  </nuxt-link>
</template>
<script setup lang="ts">
import { useUserStore } from '~~/stores/user';
const userStore = useUserStore();
</script>
