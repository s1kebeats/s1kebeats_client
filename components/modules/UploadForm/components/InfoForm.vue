<template>
  <form class="relative flex flex-col gap-5">
    <UiFormRequestErrorOutput
      :open="infoFormState.error"
      @close="
        () => {
          infoFormState.error = false;
        }
      "
    />
    <fieldset class="flex gap-5 items-center">
      <ImagePreview />
      <fieldset class="h-full grow flex flex-col gap-5">
        <div class="flex gap-5">
          <UiTextInput
            :class="v$.name.$error ? '!border-red-500' : ''"
            @update-value="(value: string) => setBeatInfo('name', value)"
            type="text"
            placeholder="Введите название"
            class="h-full"
            name="beatName"
            title="Название"
            :required="true"
          />
          <UiNumberInput
            @update-value="(value: number) => setBeatInfo('bpm', value)"
            placeholder="Введите Bpm"
            name="beatBpm"
            title="Bpm"
          />
        </div>

        <UiTextArea
          :class="v$.description.$error ? '!border-red-500' : ''"
          @update-value="(value: string) => setBeatInfo('description', value)"
          type="text"
          placeholder="Введите описание"
          class="w-full h-full max-h-[152px]"
          name="beatDescription"
          title="Описание"
          :blocked="true"
        />
      </fieldset>
    </fieldset>
    <fieldset class="flex gap-5">
      <UiNumberInput
        :class="v$.wavePrice.$error ? '!border-red-500' : ''"
        @update-value="(value: number) => setBeatInfo('wavePrice', value)"
        placeholder="Введите цену за Wave"
        class="grow h-full"
        name="beatWavePrice"
        title="Цена за Wave"
        :required="true"
      />
      <UiNumberInput
        v-if="uploadStore.uploadVersion === 'extended'"
        :class="v$.stemsPrice.$error ? '!border-red-500' : ''"
        @update-value="(value: number) => setBeatInfo('stemsPrice', value)"
        class="grow"
        placeholder="Введите цену за Trackout"
        name="beatStemsPrice"
        title="Цена за Trackout"
        :required="true"
      />
    </fieldset>
    <div class="flex items-center gap-5">
      <UiButton class="px-5" @click.prevent="uploadStore.decrementPage()">
        Назад
      </UiButton>
      <UiFormValidationErrorOutput :v="v$" />
      <UiButton class="ml-auto px-5" @click.prevent="upload">
        Опубликовать
      </UiButton>
    </div>
  </form>
</template>
<script setup lang="ts">
import {
  helpers,
  maxLength,
  required,
  requiredIf,
} from '@vuelidate/validators';
import ImagePreview from './ui/ImagePreview.vue';
import useUploadStore from '@/components/modules/UploadForm/store';
import useVuelidate from '@vuelidate/core';
import BeatUpload from '@/api/models/BeatUpload';

const emit = defineEmits<{
  (event: 'success'): void;
}>();

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
});

const infoFormRules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('* Заполните поля', required),
      maxLength: helpers.withMessage(
        'Максимальная длина: 255 символов',
        maxLength(255)
      ),
    },
    wavePrice: {
      required: helpers.withMessage('* Заполните поля', required),
    },
    stemsPrice: {
      requiredIf: helpers.withMessage(
        '* Заполните поля',
        requiredIf(() => uploadStore.uploadVersion === 'extended')
      ),
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

      await uploadStore.upload(
        infoFormState.data as Omit<
          BeatUpload,
          'wave' | 'mp3' | 'image' | 'stems'
        >
      );

      emit('success');
    } catch (error) {
      infoFormState.error = true;
    } finally {
      infoFormState.pending = false;
    }
  }
}

function setBeatInfo(
  field: keyof typeof infoFormState.data,
  value: string | number
) {
  infoFormState.data[field] = value;
}
</script>
