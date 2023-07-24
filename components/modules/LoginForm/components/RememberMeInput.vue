<template>
  <div
    class="grow flex items-center justify-end gap-2"
    data-testid="rememberMeInput"
  >
    <label for="rememberMe" class="desktop-text-xs">Сохранить вход?</label>
    <UiCheckboxInput
      name="rememberMe"
      @update-value="updateValue"
      :value="value"
      data-testid="checkboxInput"
    />
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  value: boolean;
}>();

const emit = defineEmits<{
  (e: 'updateValue', newVal: boolean): void;
}>();

function updateValue(newVal: boolean) {
  emit('updateValue', newVal);
}
</script>
