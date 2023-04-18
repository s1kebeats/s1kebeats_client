<template>
  <AuthorIndividualInfo :author="author!" />
  <AuthorBeats :data="author!.beats" />
</template>
<script setup lang="ts">
import AuthorIndividual from '@/api/models/AuthorIndividual';
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const { data: author } = await useFetch<AuthorIndividual>(
  `${runtimeConfig.public.API_URL}/author/${route.params.username}`
);
if (!author.value) {
  showError({ statusCode: 404, statusMessage: 'Страница не найдена' });
}
</script>
