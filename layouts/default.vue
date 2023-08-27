<template>
  <div id="layout" class="flex flex-col">
    <AppHeader />
    <main class="grow">
      <slot />
    </main>
  </div>
</template>
<script setup lang="ts">
import { AppHeader } from '@/components/modules';
</script>
