<template>
  <div class="h-[17px] flex items-center">
    <span
      v-if="errors.length"
      class="text-sm text-danger truncate"
      data-testid="validationErrorOutput"
      >{{ errors[0].$message }}</span
    >
  </div>
</template>
<script setup lang="ts">
import { ErrorObject } from '@vuelidate/core';
const props = defineProps<{
  errors: ErrorObject[];
}>();
</script>
