<template>
  <NavButton
    @click="redirect"
    class="bg-black text-white"
    text="Опубликовать"
    icon="material-symbols:upload-rounded"
    data-testid="uploadButton"
  />
</template>
<script setup lang="ts">
import NavButton from './NavButton.vue';

async function redirect() {
  await navigateTo('/upload');
}
</script>
