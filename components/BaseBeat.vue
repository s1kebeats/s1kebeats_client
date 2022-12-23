<template>
  <div>
    <BaseApiImage :src="data.image" class="w-[230px] h-[230px]" />
  </div>
</template>
<script setup lang="ts">
import Beat from '~~/models/Beat';
import BeatForAuthor from '~~/models/BeatForAuthor';

const props = defineProps<{
  data: Beat | BeatForAuthor;
}>();
</script>
