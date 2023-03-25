<template>
  <div class="grow flex flex-col">
    <label
      :for="name"
      class="relative w-full h-full border-[1px] flex flex-col items-center justify-center p-10 cursor-pointer rounded-md"
    >
      <Icon v-if="icon" :name="icon" height="90px" width="90px" class="mb-3" />
      <div class="flex flex-col items-center gap-1 mb-3">
        <span class="text-2xl font-semibold"> {{ title }}</span>
        <span class="text-xs" v-if="description"> {{ description }}</span>
      </div>
      <div
        v-show="selected"
        class="absolute bottom-5 bg-black text-white rounded-lg py-1 px-3 text-sm max-w-[200px] truncate"
      >
        {{ selected }}
      </div>
    </label>
    <input
      ref="inputElement"
      :name="name"
      :id="name"
      type="file"
      class="hidden"
      :accept="accept"
      @input="updateValue"
    />
  </div>
</template>
<script setup lang="ts">
import { Ref } from 'vue';
const props = defineProps<{
  title: string;
  description?: string;
  name: string;
  icon?: string;
  accept?: string;
}>();
const emit = defineEmits<{
  (e: 'updateValue', value: File): void;
}>();

const inputElement = ref<HTMLInputElement>();

const selected: Ref<string | null> = ref(null);

const updateValue = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files) {
    emit('updateValue', input.files[0]);
    selected.value = input.files[0].name;
  }
};
</script>
