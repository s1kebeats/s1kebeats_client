<template>
  <BaseFileInput
    icon="ic:outline-music-note"
    name="wav"
    title="WAV Аудио"
    description="Аудио в формате .wav"
    accept=".wav"
    :value="value"
    @update-value="updateValue"
  />
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'updateValue', value: File): void;
}>();
const props = defineProps<{
  value: string;
}>();
const updateValue = (value: File) => {
  emit('updateValue', value);
};
</script>
