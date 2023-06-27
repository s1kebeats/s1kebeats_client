<template>
  <UiLoadingSpinner
    v-if="emailActivationStore.loading"
    data-testid="loadingSpinner"
  />
  <div
    data-testid="emailActivationInfo"
    class="grow flex flex-col items-center justify-center gap-5 font-medium"
    v-else
  >
    <EmailActivationSuccess />
    <EmailActivationError />
  </div>
</template>
<script setup lang="ts">
import useEmailActivationStore from './store';
import EmailActivationError from './components/EmailActivationError.vue';
import EmailActivationSuccess from './components/EmailActivationSuccess.vue';

const emailActivationStore = useEmailActivationStore();
const route = useRoute();

onMounted(async () => {
  const activation = route.path.split('/')[2];
  emailActivationStore.activate(activation);
});
</script>
