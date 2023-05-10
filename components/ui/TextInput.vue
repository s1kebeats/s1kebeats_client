<template>
  <UiTitledInput
    :title="title"
    :focused="focused"
    :name="name"
    @click="focus"
    :required="required"
    data-testid="titledInput"
  >
    <input
      ref="input"
      class="max-w-[calc(100%-16px)] focus:outline-none"
      autocomplete="off"
      :type="type"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      @input="updateValue"
      @focus="focus"
      @blur="blur"
      data-testid="textInput"
    />
    <slot />
  </UiTitledInput>
</template>
<script setup lang="ts">
interface Props {
  name: string;
  title?: string;
  placeholder?: string;
  type: 'text' | 'email' | 'password';
  required?: boolean;
  value: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});

const emit = defineEmits<{
  (event: 'updateValue', value: string): void;
}>();

const input = ref();

function updateValue(e: Event) {
  emit('updateValue', input.value.value.trim());
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
