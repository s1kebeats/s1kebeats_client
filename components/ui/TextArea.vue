<template>
  <UiTitledInput
    :title="title"
    :name="name"
    :focused="focused"
    @click="focus"
    :required="required"
  >
    <textarea
      ref="input"
      class="grow h-full focus:outline-none min-h-[20px]"
      :class="resize ? '' : 'resize-none'"
      autocomplete="off"
      :name="name"
      :placeholder="placeholder"
      @input="updateValue"
      @focus="focus"
      @blur="blur"
      data-testid="textArea"
    />
    <slot />
  </UiTitledInput>
</template>
<script setup lang="ts">
import UiTitledInput from './TitledInput.vue';
interface Props {
  title?: string;
  name: string;
  placeholder?: string;
  resize?: boolean;
  required?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  resize: true,
});
const emit = defineEmits<{
  (event: 'updateValue', value: string): void;
}>();

const input = ref();
const value = ref('');

function updateValue(e: Event) {
  const input = e.target as HTMLInputElement;
  value.value = input.value.trim();
  emit('updateValue', value.value);
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
  emit('updateValue', value.value);
});
</script>
