<template>
  <MediaInput
    icon="material-symbols:unarchive-outline-rounded"
    name="stems"
    title="Trackout архив"
    accept=".zip, .rar"
    description="Архив в формате .zip, .rar"
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
