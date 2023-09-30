<template>
  <div id="layout" class="flex flex-col">
    <AppHeader />
    <MobileOverlay />
    <main class="grow">
      <slot />
    </main>
  </div>
</template>
<script setup lang="ts">
import { AppHeader, MobileOverlay } from '@/components/modules';
</script>
