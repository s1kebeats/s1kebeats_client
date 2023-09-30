<template>
  <div class="px-[5%] w-full flex justify-between gap-[5%]">
    <template v-if="authStore.authorized">
      <SBBtn size="sm" class="grow" @click="navigateTo('/upload')"
        >Опубликовать</SBBtn
      >
      <SBBtn size="sm" class="grow" @click="navigateTo('/logout')">Выход</SBBtn>
    </template>
    <template v-else>
      <SBBtn size="sm" class="grow" @click="navigateTo('/login')">Вход</SBBtn>
      <SBBtn
        size="sm"
        design="secondary"
        color="secondary"
        class="grow"
        @click="navigateTo('/register')"
        >Регистрация</SBBtn
      >
    </template>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores';
import { SBBtn } from '@s1kebeats/s1kebeats-ui';

const authStore = useAuthStore();
</script>
