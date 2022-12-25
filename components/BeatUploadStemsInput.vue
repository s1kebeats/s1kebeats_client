<template>
  <BaseFileInput
    icon="material-symbols:unarchive-outline-rounded"
    name="stems"
    title="Trackout архив"
    accept=".zip, .rar"
    description="Архив в формате .zip, .rar"
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
