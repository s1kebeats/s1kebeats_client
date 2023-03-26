<template>
  <UiLoadingSpinner v-if="loading" />
  <div
    class="grow flex flex-col items-center justify-center gap-5 font-medium text-xl"
    v-else
  >
    <template v-if="error.state">
      <div class="flex flex-col gap-5 items-center justify-center">
        <Icon
          name="material-symbols:warning-rounded"
          color="#ff0000"
          size="90px"
        />
        <template v-if="error.status === 404">
          <p class="text-md" data-testid="errorTitle">Ошибка</p>
          <p class="text-xs" data-testid="errorDescription">Проверьте ссылку</p>
        </template>
        <template v-else>
          <p class="text-md" data-testid="errorTitle">
            Произошла непредвиденная ошибка
          </p>
          <p class="text-xs" data-testid="errorDescription">
            Проверьте ваше интернет соединение
          </p>
        </template>
      </div>
    </template>
    <template v-else>
      <Icon name="ep:success-filled" size="90px" />
      Электронная почта подтверждена
      <nuxt-link
        to="/login"
        class="text-[#7945fc] font-semibold transition-all hover:brightness-[75%]"
        >Вход</nuxt-link
      >
    </template>
  </div>
</template>
<script setup lang="ts">
import useEmailActivationStore from './store';

const emailActivationStore = useEmailActivationStore()
const route = useRoute();

onMounted(async () => {
    const link = route.path.split('/')[1]
    emailActivationStore.activate(link)
});
</script>
