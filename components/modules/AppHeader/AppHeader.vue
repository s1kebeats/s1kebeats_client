<template>
  <header
    class="px-[5%] md:px-[10%] h-[64px] relative flex items-center justify-between gap-[5%]"
  >
    <nuxt-link to="/">
      <AppLogo class="w-[55px] sm:w-[65px]" />
    </nuxt-link>
    <Search />
    <OverlayButton />
  </header>
</template>
<script setup lang="ts">
import { AppLogo } from '@/components/ui';
import { Search, OverlayButton } from './components';
</script>
