<template>
  <div
    @click="checkbox"
    class="cursor-pointer flex items-center justify-center w-[15px] h-[15px] rounded-full border-[1px] focus:border-black"
    tabindex="0"
  >
    <div
      v-show="value"
      class="w-[11px] h-[11px] rounded-full bg-[#7945fc]"
    ></div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  value: boolean;
  color?: string;
}>();
const emit = defineEmits<{
  (e: 'updateValue', value: boolean): void;
}>();
const value = ref(props.value);
const checkbox = () => {
  value.value = !value.value;
  emit('updateValue', value.value);
};
</script>
