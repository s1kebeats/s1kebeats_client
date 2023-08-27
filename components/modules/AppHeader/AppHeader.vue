<template>
  <header class="px-[5%] md:px-[10%]">
    <nuxt-link to="/">
      <AppLogo />
    </nuxt-link>
    <Search />
    <!-- <OverlayButton /> -->
  </header>
</template>
<script>
import { AppLogo } from '@/components/ui';
import { Search } from './components';
</script>
