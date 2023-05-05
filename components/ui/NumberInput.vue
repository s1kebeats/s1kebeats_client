<template>
  <UiTitledInput
    :title="title"
    :focused="focused"
    :name="name"
    @click="focus"
    :required="required"
  >
    <input
      ref="input"
      class="max-w-[calc(100%-16px)] focus:outline-none"
      autocomplete="off"
      type="text"
      :name="name"
      :placeholder="placeholder"
      @input="updateValue"
      @focus="focus"
      @blur="blur"
      :value="value"
      data-testid="numberInput"
    />
    <slot />
  </UiTitledInput>
</template>
<script setup lang="ts">
import UiTitledInput from './TitledInput.vue';
const props = defineProps<{
  title?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value: number | null;
}>();
const emit = defineEmits<{
  (event: 'updateValue', value: number | null): void;
}>();

const input = ref();

function updateValue(e: Event) {
  emit('updateValue', +input.value.value.replace(/[^0-9.]/g, ''));
}

const focused = ref(false);

function focus() {
  input.value.focus();
  focused.value = true;
}
function blur() {
  focused.value = false;
}

onMounted(() => {
  emit('updateValue', input.value.value);
});
</script>
