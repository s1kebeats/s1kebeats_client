<template>
  <div
    role="checkbox"
    :aria-checked="value"
    :name="name"
    @click="updateValue"
    class="cursor-pointer flex items-center justify-center w-[15px] h-[15px] rounded-full border-[1px] focus:border-black focus:outline-none"
    tabindex="0"
    data-testid="checkbox"
  >
    <div
      v-show="value"
      class="w-[11px] h-[11px] rounded-full brand-gradient"
      data-testid="chekboxIndicator"
    ></div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  checked?: boolean;
  name: string;
}

const props = withDefaults(defineProps<Props>(), {
  checked: false,
});

const emit = defineEmits<{
  (e: 'updateValue', value: boolean): void;
}>();

const value = ref(props.checked);

const updateValue = () => {
  value.value = !value.value;
  emit('updateValue', value.value);
};
</script>
