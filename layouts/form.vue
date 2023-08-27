<template>
  <div id="layout" class="flex">
    <section
      class="hidden md:flex items-center justify-center grow bg-image-main"
    >
      <nuxt-link class="w-[min(50%,400px)]" to="/">
        <AppLogo />
      </nuxt-link>
    </section>
    <section
      class="bg-image-mobile md:bg-none md:bg-grayscale-bg w-full md:w-[clamp(320px,30%,576px)] flex flex-col gap-5 items-center justify-center"
    >
      <nuxt-link class="w-[min(35%,140px)] md:hidden" to="/">
        <AppLogo />
      </nuxt-link>
      <slot />
    </section>
  </div>
</template>
<script setup lang="ts">
import { AppLogo } from '@/components/ui';
</script>
