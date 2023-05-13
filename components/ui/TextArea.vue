<template>
  <UiTitledInput
    :title="title"
    :name="name"
    :focused="focused"
    @click="focus"
    :required="required"
    data-testid="titledInput"
  >
    <textarea
      ref="input"
      class="grow h-full focus:outline-none min-h-[20px]"
      :class="resize ? '' : 'resize-none'"
      autocomplete="off"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue"
      @focus="focus"
      @blur="blur"
      data-testid="textArea"
    />
    <slot />
  </UiTitledInput>
</template>
<script setup lang="ts">
interface Props {
  title?: string;
  name: string;
  placeholder?: string;
  resize?: boolean;
  required?: boolean;
  value: string;
}
const props = withDefaults(defineProps<Props>(), {
  resize: true,
});
const emit = defineEmits<{
  (event: 'updateValue', value: string): void;
}>();

const input = ref();

function updateValue(e: Event) {
  const input = e.target as HTMLInputElement;
  emit('updateValue', input.value.trim());
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
