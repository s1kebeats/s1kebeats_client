<template>
  <MediaInput
    icon="ic:outline-music-note"
    name="mp3"
    title="MP3 Аудио"
    description="Аудио в формате .mp3"
    accept=".mp3"
    @update-value="updateValue"
  />
</template>
<script setup lang="ts">
import MediaInput from './ui/MediaInput.vue';

const emit = defineEmits<{
  (e: 'updateValue', value: File): void;
}>();
const updateValue = (value: File) => {
  emit('updateValue', value);
};
</script>
