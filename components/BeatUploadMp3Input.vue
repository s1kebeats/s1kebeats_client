<template>
  <BeatUploadFileInput
    class="w-[100%] h-[50%]"
    icon="ic:outline-music-note"
    name="mp3"
    title="MP3 Аудио"
    description="Аудио в формате .mp3"
    accept=".mp3"
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
