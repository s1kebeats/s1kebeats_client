<template>
  <HeaderUiNavButton
    @click="redirect"
    class="bg-black text-white"
    text="Опубликовать"
    icon="material-symbols:upload-rounded"
  />
</template>
<script setup lang="ts">
import HeaderUiNavButton from './ui/NavButton.vue';

async function redirect() {
  await navigateTo('/upload');
}
</script>
