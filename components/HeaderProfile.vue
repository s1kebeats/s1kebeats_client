<template>
  <!-- <nuxt-link
    :to="userStore.authorized ? `/${userStore.user.username}` : '/register'"
  > -->
  <div class="relative">
    <button @click="toggleProfileOverlay">
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
      <Icon
        name="ic:baseline-keyboard-arrow-down"
        size="18px"
        class="transition-all"
        :class="showProfileOverlay ? 'rotate-180' : ''"
      />
    </button>
    <div
      class="absolute bg-white rounded-md shadow-md flex flex-col gap-1 px-1 py-5"
      v-show="showProfileOverlay"
    >
      <nuxt-link
        to="/upload"
        class="text-center bg-black text-white rounded-md p-2 text-xs transition-all"
      >
        Вход
      </nuxt-link>
      <nuxt-link
        to="/upload"
        class="text-center bg-black text-white rounded-md p-2 text-xs transition-all"
      >
        Регистрация
      </nuxt-link>
    </div>
  </div>

  <!-- </nuxt-link> -->
</template>
<script setup lang="ts">
import { useUserStore } from '~~/stores/user';
const userStore = useUserStore();
const showProfileOverlay = ref(false);
const toggleProfileOverlay = () => {
  showProfileOverlay.value = !showProfileOverlay.value;
};
</script>
