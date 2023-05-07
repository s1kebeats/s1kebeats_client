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
      class="w-[11px] h-[11px] rounded-full bg-[#7945fc]"
      data-testid="chekboxIndicator"
    ></div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  value: boolean;
  name: string;
}>();

const emit = defineEmits<{
  (e: 'updateValue', value: boolean): void;
}>();

const updateValue = () => {
  emit('updateValue', !props.value);
};
</script>
