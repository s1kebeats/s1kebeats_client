<template>
  <div class="relative">
    <button
      @click="toggleProfileOverlay"
      class="flex items-center gap-1"
      @focusout="closeProfileOverlay"
    >
      <Icon
        v-if="!userStore.authorized"
        name="ic:round-account-circle"
        color="#e5e7eb"
        size="32px"
      />
      <div
        v-if="userStore.authorized && !userStore.user.image"
        class="profile-bg rounded-full w-[32px] h-[32px] flex items-center justify-center text-lg text-white"
      >
        {{ userStore.user.username.charAt(0).toUpperCase() }}
      </div>
      <BaseApiImage
        v-if="userStore.authorized && userStore.user.image"
        :src="userStore.user.image"
        class="rounded-full border-[1px] w-[32px] h-[32px]"
        width="32px"
        height="32px"
        alt="Profile Image"
      />
      <Icon
        name="ic:baseline-keyboard-arrow-down"
        size="18px"
        class="transition-all"
        :class="showProfileOverlay ? 'rotate-180' : ''"
      />
    </button>
    <HeaderProfilePopUp :show="showProfileOverlay" />
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '~~/stores/user';
const userStore = useUserStore();
const showProfileOverlay = ref(false);
const toggleProfileOverlay = () => {
  showProfileOverlay.value = !showProfileOverlay.value;
};
function closeProfileOverlay() {
  setTimeout(toggleProfileOverlay, 200);
}
</script>
<style scoped>
.profile-bg {
  background-image: linear-gradient(to bottom, rgba(0, 255, 21, 0.8), #00ff4c8c),
    url('~/assets/images/profile-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
