<template>
  <div class="h-[17px] flex items-center">
    <span
      v-if="errors.length"
      class="text-sm text-danger truncate"
      data-testid="validationErrorOutput"
      >{{ errors[0] }}</span
    >
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  errors: string[];
}>();
</script>
