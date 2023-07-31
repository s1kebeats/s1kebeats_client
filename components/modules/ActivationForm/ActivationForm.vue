<template>
  <PageForm
    title="Подтверждение входа"
    :pending="activationFormState.pending"
    button-text="Подтвердить"
    :error-state="activationFormState.error.state"
    :error-status="activationFormState.error.status"
    @submit-form="submitActivationForm"
    @close-error="closeErrorPopUp"
  >
    <p class="text-center desktop-text-xs">
      Проверьте электронную почту, мы отправили вам код.
    </p>
    <TextInput
      name="activationCodeInput"
      label="Введите код"
      size="sm"
      :state="v$.activationCode.$error ? 'error' : null"
      @update-value="
        ($event: string) => {
          activationFormState.data.activationCode = $event;
        }
      "
    />
    <UiFormValidationErrorOutput :errors="v$.$errors" />
  </PageForm>
</template>
<script setup lang="ts">
import PageForm from '@/components/modules/PageForm/PageForm.vue';
import { TextInput } from '@s1kebeats/s1kebeats-ui';
import { helpers, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import useAuthStore from '@/stores/auth';
import useUiStore from '@/stores/ui';
import useTempAuthStore from '@/stores/tempAuth';

const authStore = useAuthStore();
const uiStore = useUiStore();
const tempAuthStore = useTempAuthStore();

const emit = defineEmits<{
  (e: 'success'): void;
}>();

const activationFormState = reactive<{
  data: {
    activationCode: string;
  };
  error: {
    state: boolean;
    status: number | null;
  };
  pending: boolean;
}>({
  data: {
    activationCode: '',
  },
  error: {
    state: false,
    status: null,
  },
  pending: false,
});

const activationRules = computed(() => {
  return {
    activationCode: {
      required: helpers.withMessage('Введите код подтверждения', required),
    },
  };
});

const v$ = useVuelidate(activationRules, activationFormState.data, {
  $autoDirty: true,
  $lazy: true,
});

function closeErrorPopUp() {
  activationFormState.error.state = false;
  setTimeout(() => {
    activationFormState.error.status = null;
  }, 200);
}

async function submitActivationForm() {
  const result = await v$.value.$validate();
  if (result) {
    try {
      activationFormState.pending = true;

      await authStore.activate(activationFormState.data.activationCode);
      await authStore.login(...Object.values(tempAuthStore.getData()));
      uiStore.setLoading(true);
      emit('success');
    } catch (error: any) {
      activationFormState.error.state = true;
      if (error.response.status) {
        activationFormState.error.status = error.response.status;
      }
    } finally {
      activationFormState.pending = false;
    }
  }
}
</script>
