<template>
  <div class="relative flex items-center gap-5 h-[48px] mb-6">
    <nuxt-link to="/">
      <img
        src="~/assets/images/logo_main.svg"
        height="48px"
        width="61px"
        alt="s1kebeats"
      />
    </nuxt-link>
    <div class="flex flex-col items-center justify-center">
      <h1 class="w-full text-xl font-semibold">{{ title }}</h1>
      <h2 class="text-sm">
        <slot />
      </h2>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>
