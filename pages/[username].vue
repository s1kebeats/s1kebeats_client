<template>
  <template v-if="author">
    <TheAuthorIndividualInfo :author="author" />
    <TheAuthorBeats :data="author.beats" />
  </template>
</template>
<script setup lang="ts">
import AuthorIndividual from '@/api/models/AuthorIndividual';
const route = useRoute();
const { data: author } = await useFetch<AuthorIndividual>(
  `http://localhost:5000/api/author/${route.params.username}`
);
if (!author.value) {
  showError({ statusCode: 404, statusMessage: 'Страница не найдена' });
}
</script>
