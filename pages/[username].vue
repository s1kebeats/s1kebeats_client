<template>
  <main class="grow flex flex-col gap-2 pt-5">
    <template v-if="author">
      <TheAuthorIndividualInfo :author="author" />
      <TheAuthorBeats :data="author.beats" />
    </template>
  </main>
</template>
<script setup lang="ts">
import AuthorIndividual from '~~/models/AuthorIndividual';
const route = useRoute();
const { data: author } = await useFetch<AuthorIndividual>(
  `http://localhost:5000/api/author/${route.params.username}`
);
if (!author.value) {
  showError({ statusCode: 404, statusMessage: 'Страница не найдена' });
}
</script>
