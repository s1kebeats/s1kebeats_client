<template>
  <nuxt-link
    :to="userStore.authorized ? `/${userStore.user.username}` : '/login'"
  >
    <Icon
      v-if="!userStore.user.image"
      name="ic:round-account-circle"
      color="#e5e7eb"
      size="30px"
    />
    <BaseApiImage
      v-else
      :src="userStore.user.image"
      class="rounded-full border-[1px] w-[30px] h-[30px]"
      width="30px"
      height="30px"
      alt="Profile Image"
    />
  </nuxt-link>
</template>
<script setup lang="ts">
import { useUserStore } from '~~/stores/user';
const userStore = useUserStore();
</script>
