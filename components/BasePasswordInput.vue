<template>
  <BaseTitledInput
    :type="passwordVisible ? 'text' : 'password'"
    @update-value="updateValue"
    :title="title"
    :placeholder="placeholder"
    :value="value"
  >
    <button @click.prevent="togglePasswordVisibility">
      <Icon
        size="16px"
        :name="
          passwordVisible
            ? 'material-symbols:visibility-outline-rounded'
            : 'material-symbols:visibility-off-outline-rounded'
        "
      />
    </button>
  </BaseTitledInput>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string;
  placeholder?: string;
  value: string;
}>();
const emit = defineEmits<{
  (e: 'updateValue', value: string): void;
}>();
const updateValue = (value: string) => {
  emit('updateValue', value);
};
const passwordVisible = ref(false);
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
</script>
