<template>
  <div
    class="text-center font-semibold flex flex-col items-center justify-center gap-1"
    v-if="!emailActivationStore.error.state"
  >
    <Icon name="ep:success-filled" size="90px" />
    Электронная почта подтверждена
    <nuxt-link
      to="/login"
      class="text-[#7945fc] text-sm transition-all hover:brightness-[75%]"
      >Вход</nuxt-link
    >
  </div>
</template>
<script setup lang="ts">
import useEmailActivationStore from '@/components/modules/EmailActivation/store';

const emailActivationStore = useEmailActivationStore();
</script>
