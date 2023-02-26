<template>
  <div class="w-[35%] flex flex-col">
    <label
      :for="name"
      class="bg-gray-200 h-full flex flex-col items-center justify-center gap-3 p-5 cursor-pointer text-black rounded-md"
    >
      <Icon v-if="icon" :name="icon" height="90px" width="90px" />
      <div class="flex flex-col items-center gap-1">
        <span class="text-2xl font-semibold"> {{ title }}</span>
        <span class="text-xs" v-if="description"> {{ description }}</span>
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
const props = defineProps<{
  title: string;
  description?: string;
  name: string;
  icon?: string;
  accept?: string;
  value: string;
}>();
const emit = defineEmits<{
  (e: 'updateValue', value: File): void;
}>();
const inputElement = ref<HTMLInputElement>();
const updateValue = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files) {
    emit('updateValue', input.files[0]);
  }
};
watch(
  () => props.value,
  (newValue) => {
    if (!newValue) {
      inputElement.value!.value = '';
    }
  }
);
</script>
<style scoped>
.bg-filled {
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8),
      rgba(121, 69, 252, 0.55)
    ),
    url('~/assets/images/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.bg-empty {
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8),
      rgba(95, 95, 95, 0.55)
    ),
    url('~/assets/images/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
