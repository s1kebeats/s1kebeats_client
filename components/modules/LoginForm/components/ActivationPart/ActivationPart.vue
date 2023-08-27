<template>
  <PageForm
    title="Подтверждение входа"
    :pending="isSubmitting || apiSubmitting"
    button-text="Подтвердить"
    :error-state="errorState"
    :error-status="errorStatus"
    @submit-form="submitActivationForm"
    @close-error="closeErrorPopUp"
    data-testid="pageForm"
  >
    <p class="text-center text-md">
      Проверьте электронную почту, мы отправили вам код.
    </p>
    <TextInput
      name="activationCodeInput"
      label="Введите код"
      size="sm"
      v-bind="activationCode"
      data-testid="activationCodeInput"
    />
    <ValidationErrorOutput
      :errors="Object.values(errors)"
      data-testid="validationErrorOutputComponent"
    />
  </PageForm>
</template>
<script setup lang="ts">
import { PageForm } from '@/components';
import { ValidationErrorOutput } from '@/components/ui';
import { TextInput } from '@s1kebeats/s1kebeats-ui';

import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
import validationMessages from '@/components/shared/validationMessages';

const props = defineProps<{
  errorState: boolean;
  errorStatus: number | null;
  apiSubmitting: boolean;
}>();
const emit = defineEmits<{
  (e: 'submit', activationCode: string): void;
  (e: 'closeError'): void;
}>();

const schema = toTypedSchema(
  object({
    activationCode: string().required(
      validationMessages.activationCode.required
    ),
  })
);
const { values, defineComponentBinds, errors, handleSubmit, isSubmitting } =
  useForm({
    validationSchema: schema,
  });

const activationCode = defineComponentBinds('activationCode', {
  model: 'value',
  mapProps: () => ({
    state: errors.value.activationCode
      ? 'error'
      : values.activationCode
      ? 'success'
      : null,
  }),
});
const submitActivationForm = handleSubmit(async (values) => {
  emit('submit', values.activationCode);
});

function closeErrorPopUp() {
  emit('closeError');
}
</script>
