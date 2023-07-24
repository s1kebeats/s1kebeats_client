<template>
  <div
    class="text-center link flex flex-col items-center justify-center gap-1"
    data-testid="emailActivationSuccess"
    v-if="!emailActivationStore.error.state"
  >
    <Icon name="ep:success-filled" size="90px" />
    Электронная почта подтверждена
    <nuxt-link
      to="/login"
      class="text-primary desktop-text-sm transition-all hover:brightness-[75%]"
      >Вход</nuxt-link
    >
  </div>
</template>
<script setup lang="ts">
import useEmailActivationStore from '@/components/modules/EmailActivation/store';

const emailActivationStore = useEmailActivationStore();
</script>
