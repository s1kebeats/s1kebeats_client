<template>
  <form class="flex flex-col gap-5">
    <fieldset class="flex gap-5 items-center">
      <ImagePreview />
      <fieldset class="h-full grow flex flex-col gap-5">
        <div class="flex gap-5">
          <UiTextInput
            :class="v$.name.$error ? '!border-red-500' : ''"
            type="text"
            placeholder="Введите название"
            class="h-full"
            name="beatName"
            title="Название"
            :focused="false"
          />
          <UiTextInput
            :class="v$.bpm.$error ? '!border-red-500' : ''"
            type="text"
            placeholder="Введите Bpm"
            name="beatBpm"
            title="Bpm"
            :focused="false"
          />
        </div>

        <UiTextArea
          :class="v$.description.$error ? '!border-red-500' : ''"
          type="text"
          placeholder="Введите описание"
          class="w-full h-full max-h-[152px]"
          name="beatDescription"
          title="Описание"
          :focused="false"
          :blocked="true"
        />
      </fieldset>
    </fieldset>
    <fieldset class="flex gap-5">
      <UiTextInput
        :class="v$.wavePrice.$error ? '!border-red-500' : ''"
        type="text"
        placeholder="Введите цену за Wave"
        class="grow h-full"
        name="beatWavePrice"
        title="Цена за Wave"
        :focused="false"
      />
      <UiTextInput
        :class="v$.stemsPrice.$error ? '!border-red-500' : ''"
        class="grow"
        type="text"
        placeholder="Введите цену за Trackout"
        name="beatStemsPrice"
        title="Цена за Trackout"
        :focused="false"
      />
    </fieldset>
    <div class="flex justify-between">
      <UiButton class="px-5" @click.prevent="uploadStore.decrementPage()">
        Назад
      </UiButton>
      <UiButton class="px-5" @click.prevent="upload"> Опубликовать </UiButton>
    </div>
  </form>
</template>
<script setup lang="ts">
import { decimal, helpers, maxLength, required } from '@vuelidate/validators';
import ImagePreview from './ui/ImagePreview.vue';
import useUploadStore from '@/components/modules/UploadForm/store';
import useVuelidate from '@vuelidate/core';

const uploadStore = useUploadStore();

const infoFormState = reactive<{
  data: {
    name: string | null;
    wavePrice: number | null;
    stemsPrice: number | null;
    bpm: number | null;
    description: string | null;
  };
  error: boolean;
  pending: boolean;
  success: boolean;
}>({
  data: {
    name: null,
    wavePrice: null,
    stemsPrice: null,
    bpm: null,
    description: null,
  },
  error: false,
  pending: false,
  success: false,
});

const infoFormRules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('Заполните поля', required),
      maxLength: helpers.withMessage(
        'Максимальная длина: 255 символов',
        maxLength(255)
      ),
    },
    wavePrice: {
      required: helpers.withMessage('Заполните поля', required),
      decimal: helpers.withMessage('Введите число', decimal),
    },
    stemsPrice:
      uploadStore.uploadVersion === 'extended'
        ? {
            required: helpers.withMessage('Заполните поля', required),
            decimal: helpers.withMessage('Введите число', decimal),
          }
        : null,
    bpm: {
      decimal: helpers.withMessage('Введите число', decimal),
    },
    description: {
      maxLength: helpers.withMessage(
        'Максимальная длина: 255 символов',
        maxLength(255)
      ),
    },
  };
});

const v$ = useVuelidate(infoFormRules, infoFormState.data, {
  $autoDirty: true,
  $lazy: true,
});

async function upload() {
  const result = await v$.value.$validate();
  if (result) {
    try {
      infoFormState.error = false;
      infoFormState.pending = true;

      await uploadStore.upload(infoFormState.data);

      infoFormState.success = true;
    } catch (error) {
      infoFormState.error = true;
    } finally {
      infoFormState.pending = false;
    }
  }
}
</script>
