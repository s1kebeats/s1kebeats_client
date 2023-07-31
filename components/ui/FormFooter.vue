<template>
  <footer class="w-full desktop-text-xs flex items-center justify-center gap-2">
    <span class="text-black">
      {{ hint }}
    </span>
    <nuxt-link
      :to="to"
      class="text-primary link transition-all hover:text-primary-default_strong"
    >
      {{ linkTitle }}
    </nuxt-link>
  </footer>
</template>
<script setup lang="ts">
const props = defineProps<{
  to: string;
  hint: string;
  linkTitle: string;
}>();
</script>
