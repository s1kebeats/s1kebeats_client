<template>
  <span
    v-if="v.$errors.length"
    class="text-xs text-red-500"
    data-testid="errorList"
    >{{ v.$errors[0].$message }}</span
  >
</template>
<script setup lang="ts">
import { Validation } from '@vuelidate/core';
const props = defineProps<{
  v: Validation;
}>();
</script>
