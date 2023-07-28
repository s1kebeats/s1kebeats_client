<template>
  <LoginForm
    v-show="page === 0"
    @success="onLoginSuccess"
    @activate="switchPage"
  />
  <ActivationForm
    v-if="page === 1"
    @success="onLoginSuccess"
  />
</template>
<script setup lang="ts">
import LoginForm from '@/components/modules/LoginForm/LoginForm.vue';
import ActivationForm from '@/components/modules/ActivationForm/ActivationForm.vue';
import useUiStore from '@/stores/ui';

const uiStore = useUiStore();

const page = ref(0);

definePageMeta({
  layout: 'form',
  middleware: 'guest',
});

async function onLoginSuccess() {
  await navigateTo('/');
  setTimeout(() => uiStore.setLoading(false), 200);
}

function switchPage() {
  page.value = 1;
}
</script>
