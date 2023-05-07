<template>
  <div
    class="spinner border-[2px] aspect-square"
    data-testid="loadingSpinner"
    :class="`${colorVariants[color]} ${sizeVariants[size]}`"
  ></div>
</template>
<script setup lang="ts">
interface props {
  color?: keyof typeof colorVariants;
  size?: keyof typeof sizeVariants;
}
const colorVariants = {
  white: 'border-white',
  black: 'border-black',
};
const sizeVariants = {
  md: 'w-[20px]',
  sm: 'w-[15px]',
  lg: 'w-[25px]',
  xl: 'w-[40px]',
};
const props = withDefaults(defineProps<props>(), {
  color: 'white',
  size: 'md',
});
</script>
<style scoped lang="scss">
.spinner {
  clear: both;
  border-top: transparent solid !important;
  border-radius: 50%;
  -webkit-animation: spinnerRotation 0.6s infinite linear;
  animation: spinnerRotation 0.6s infinite linear;
}
@keyframes spinnerRotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
