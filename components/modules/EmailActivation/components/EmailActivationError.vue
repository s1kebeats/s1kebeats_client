<template>
  <div
    class="flex flex-col gap-1 items-center justify-center"
    data-testid="emailActivationError"
    v-if="emailActivationStore.error.state"
  >
    <Icon name="material-symbols:warning-rounded" color="#ff0000" size="90px" />
    <div class="text-center flex flex-col gap-1">
      <p class="text-md font-semibold" data-testid="errorTitle">
        {{
          emailActivationStore.error.status === 404
            ? 'Ошибка'
            : 'Произошла непредвиденная ошибка'
        }}
      </p>
      <p class="text-xs" data-testid="errorDescription">
        {{
          emailActivationStore.error.status === 404
            ? 'Проверьте ссылку'
            : 'Проверьте ваше интернет соединение'
        }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import useEmailActivationStore from '@/components/modules/EmailActivation/store';

const emailActivationStore = useEmailActivationStore();
</script>
