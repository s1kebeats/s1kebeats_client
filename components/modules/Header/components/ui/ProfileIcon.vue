<template>
  <UiProfileImage v-if="authStore.authorized" />
  <div
    v-else
    class="icon-bg rounded-full w-[32px] h-[32px] flex items-center justify-center text-lg text-white"
    data-testid="icon"
  >
    ?
  </div>
</template>
<script setup lang="ts">
import UiProfileImage from './ProfileImage.vue';
import useAuthStore from '~~/stores/auth';

const authStore = useAuthStore();
</script>
<style scoped>
.icon-bg {
  background-image: linear-gradient(to left, #7945fc, #473131),
    url('~/assets/images/profile-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>