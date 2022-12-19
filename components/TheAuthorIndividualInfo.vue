<template>
  <section class="w-full h-[250px] px-[10%]">
    <div class="w-full h-full rounded-t-lg border-[1px]">
      <!-- <BaseApiImage
        class="w-[100px] h-[100px]"
        :src="author.image ? author.image : '~/assets/images/logo_main.jpg'"
        width="100px"
        height="100px"
      /> -->
      {{ author.username }}
    </div>
  </section>
</template>
<script setup lang="ts">
import AuthorIndividual from '~~/models/AuthorIndividual';

const props = defineProps<{
  author: AuthorIndividual;
}>();
</script>
