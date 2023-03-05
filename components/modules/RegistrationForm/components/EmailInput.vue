<template>
  <AppDebouncedTextInput
    @update-value="updateValue"
    type="email"
    name="email"
    title="Электронная почта"
    placeholder="Введите электронную почту"
  />
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'updateValue', value: string): void;
}>();

function updateValue(value: string) {
  emit('updateValue', value);
}
</script>
