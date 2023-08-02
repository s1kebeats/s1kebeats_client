<template>
  <AuthorInfo :author="author!" />
  <section class="w-full px-5 grid grid-cols-2 gap-3 pb-3">
    <Beat v-for="beat in author!.beats" :data="beat" :key="beat.id" />
  </section>
</template>
<script setup lang="ts">
import AuthorIndividual from '@/api/models/AuthorIndividual';
import AuthorInfo from '@/components/modules/AuthorInfo/AuthorInfo.vue';
import Beat from '@/components/modules/Beat/Beat.vue';
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const { data: author } = await useFetch<AuthorIndividual>(
  `${runtimeConfig.public.API_URL}/author/${route.params.username}`
);
if (!author.value) {
  showError({ statusCode: 404, statusMessage: 'Страница не найдена' });
}
</script>
