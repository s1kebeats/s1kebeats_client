<template>
  <div class="grow flex items-center justify-end gap-2">
    <label for="rememberme" class="text-xs">Сохранить вход?</label>
    <UiCheckboxInput
      name="rememberme"
      @update-value="updateValue"
      :checked="true"
    />
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'updateValue', value: boolean): void;
}>();

function updateValue(value: boolean) {
  emit('updateValue', value);
}
</script>
