<template>
  <div :class="`box-${direction}`" class="h-full rounded-lg"></div>
</template>
<script setup lang="ts">
const props = defineProps<{
  direction: string;
}>();
</script>
<style lang="scss" scoped>
.box-top {
  background: rgb(121, 69, 252);
  background: linear-gradient(
    120deg,
    rgba(121, 69, 252, 1) 0%,
    rgba(0, 0, 0, 1) 80%
  );
}
.box-bottom {
  background: rgb(121, 69, 252);
  background: linear-gradient(
    120deg,
    rgba(0, 0, 0, 1) 30%,
    rgba(121, 69, 252, 1) 90%
  );
}
</style>
