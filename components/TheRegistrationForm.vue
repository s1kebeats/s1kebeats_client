<template>
  <form
    @submit.prevent="submitRegistrationForm"
    class="relative flex flex-col w-full"
  >
    <BaseFormErrorPopUp
      :open="registrationFormState.error"
      @close="
        () => {
          registrationFormState.error = false;
        }
      "
    />
    <div
      class="flex flex-col gap-3 mb-3"
      :class="!v$.$errors.length ? 'pb-8' : ''"
    >
      <BaseTitledInput
        :debounce="true"
        :class="v$.username.$error ? 'border-red-500' : ''"
        @update-value="($event: string) => { registrationFormState.data.username = $event }"
        title="Имя пользователя"
        placeholder="Введите имя пользователя"
        :value="registrationFormState.data.username"
      />
      <BaseTitledInput
        :debounce="true"
        :class="v$.email.$error ? 'border-red-500' : ''"
        @update-value="($event: string) => { registrationFormState.data.email = $event }"
        type="email"
        title="Электронная почта"
        placeholder="Введите электронную почту"
        :value="registrationFormState.data.email"
      />
      <BasePasswordInput
        :class="v$.password.$error ? 'border-red-500' : ''"
        @update-value="($event: string) => { registrationFormState.data.password = $event }"
        title="Пароль"
        placeholder="Введите имя пароль"
        :value="registrationFormState.data.password"
      />
      <BasePasswordInput
        :class="v$.passwordConfirm.$error ? 'border-red-500' : ''"
        @update-value="($event: string) => { registrationFormState.data.passwordConfirm = $event }"
        title="Подтверждение пароля"
        placeholder="Введите пароль ещё раз"
        :value="registrationFormState.data.passwordConfirm"
      />
      <BaseFormErrorOutput :v$="v$" />
    </div>
    <BaseButton type="submit">
      <!-- <transition name="spinner"> -->
        <BaseLoadinSpinner v-if="registrationFormState.pending" />
        <span v-else>Зарегистрироваться</span>
      <!-- </transition> -->
    </BaseButton>
  </form>
</template>
<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import {
  email,
  minLength,
  required,
  sameAs,
  helpers,
} from '@vuelidate/validators';

const emit = defineEmits<{
  (e: 'success'): void;
}>();

const registrationFormState = reactive<{
  data: {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
  };
  error: boolean;
  pending: boolean;
}>({
  data: {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  },
  error: false,
  pending: false,
});

const passwordComplexity = (param: string): boolean => {
  return /\d/.test(param) && /[A-Z]/.test(param);
};

const usernameAvailable = async (param: string): Promise<boolean> => {
  const { data: user } = await useFetch(
    `http://localhost:5000/api/author/${param}`
  );
  if (user.value) {
    return false;
  }
  return true;
};

const registrationRules = computed(() => {
  return {
    username: {
      required: helpers.withMessage('Заполните поля', required),
      available: helpers.withMessage(
        'Имя пользователя занято',
        helpers.withAsync(usernameAvailable)
      ),
    },
    email: {
      required: helpers.withMessage('Заполните поля', required),
      email: helpers.withMessage('Введите настоящую электронную почту', email),
    },
    password: {
      required: helpers.withMessage('Заполните поля', required),
      minLength: helpers.withMessage(
        'Минимальная длина пароля: 8 символов',
        minLength(8)
      ),
      complexity: helpers.withMessage(
        'Пароль должен содержать хотя бы одну цифру и заглавную букву',
        passwordComplexity
      ),
    },
    passwordConfirm: {
      required: helpers.withMessage('Заполните поля', required),
      sameAs: helpers.withMessage(
        'Пароли не совпадают',
        sameAs(registrationFormState.data.password)
      ),
    },
  };
});

const v$ = useVuelidate(registrationRules, registrationFormState.data, {
  $autoDirty: true,
  $lazy: true,
});

async function submitRegistrationForm() {
  const result = await v$.value.$validate();
  if (result) {
    try {
      registrationFormState.error = false;
      registrationFormState.pending = true;

      await useRegister(
        registrationFormState.data.email,
        registrationFormState.data.username,
        registrationFormState.data.password
      );

      emit('success');
    } catch (error: any) {
      registrationFormState.error = true;
    } finally {
      registrationFormState.pending = false;
    }
  }
}
</script>
<style lang="scss" scoped>
.spinner-enter-active,
.spinner-leave-active {
  transition: opacity 0.2s ease;
}
.spinner-enter-from,
.spinner-leave-to {
  opacity: 0;
}
</style>
