<template>
  <UiTextInput
    title="Имя пользователя"
    name="username"
    type="text"
    placeholder="Введите имя пользователя"
    @update-value="updateValue"
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
