<template>
  <section
    class="relative w-full grow flex flex-col justify-between gap-5 px-3"
  >
    <form class="relative flex flex-col items-center gap-3">
      <AppFormRequestErrorOutput
        :open="infoFormState.error"
        @close="
          () => {
            infoFormState.error = false;
          }
        "
      />

      <div class="grid gap-3 grid-cols-2">
        <ImagePreview class="row-span-2" />
        <UiTextInput
          :class="v$.name.$error ? '!border-red-500' : ''"
          @update-value="(value: string) => setBeatInfo('name', value)"
          type="text"
          placeholder="Введите название"
          name="beatName"
          title="Название"
          :required="true"
          :value="infoFormState.data.name ?? ''"
        />
        <UiNumberInput
          @update-value="(value: number | null) => setBeatInfo('bpm', value)"
          placeholder="Введите Bpm"
          name="beatBpm"
          title="Bpm"
          :value="infoFormState.data.bpm ?? null"
        />
        <UiTextArea
          :class="v$.description.$error ? '!border-red-500' : ''"
          @update-value="(value: string) => setBeatInfo('description', value)"
          type="text"
          placeholder="Введите описание"
          name="beatDescription"
          title="Описание"
          :blocked="true"
          class="col-span-2"
        />
        <UiNumberInput
          :class="v$.wavePrice.$error ? '!border-red-500' : ''"
          @update-value="(value: number | null) => setBeatInfo('wavePrice', value)"
          placeholder="Введите цену за Wave"
          name="beatWavePrice"
          title="Цена за Wave"
          :required="true"
          class="col-span-2"
          :value="infoFormState.data.wavePrice ?? null"
        />
        <UiNumberInput
          v-if="uploadStore.uploadVersion === 'extended'"
          :class="v$.stemsPrice.$error ? '!border-red-500' : ''"
          @update-value="(value: number | null) => setBeatInfo('stemsPrice', value)"
          placeholder="Введите цену за Trackout"
          name="beatStemsPrice"
          title="Цена за Trackout"
          :required="true"
          class="col-span-2"
          :value="infoFormState.data.stemsPrice ?? null"
        />
        <div class="flex flex-col gap-3 col-span-2">
          <span class="text-lg font-semibold">Теги</span>
          <UiTextInput
            type="text"
            name="tags"
            placeholder="Введите тег"
            @update-value="updateTagNameInputValue"
            :value="tagNameInputValue"
          >
            <button @click.prevent="addTag">
              <Icon
                name="material-symbols:add-circle-outline-rounded"
                size="20px"
              />
            </button>
          </UiTextInput>
          <div
            v-if="infoFormState.data.tags.length"
            class="flex flex-wrap gap-1"
          >
            <div
              v-for="tag in infoFormState.data.tags"
              :key="tag"
              class="bg-[#7945fc] px-2 py-1 rounded-md text-white"
            >
              #{{ tag }}
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="w-full flex items-center gap-3">
      <UiButton @click.prevent="uploadStore.decrementPage()"> Назад </UiButton>
      <UiFormValidationErrorOutput :v="v$" />
      <UiButton
        class="ml-auto w-[120px]"
        @click.prevent="upload"
        :disabled="infoFormState.pending"
      >
        <UiLoadingSpinner v-if="infoFormState.pending" size="sm" />
        <span v-else>Опубликовать</span>
      </UiButton>
    </div>
  </section>
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
    tags: string[];
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
    tags: [],
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
        'Максимальная длина описания: 255 символов',
        maxLength(255)
      ),
    },
  };
});

const v$ = useVuelidate(infoFormRules, infoFormState.data, {
  $lazy: true,
});

async function upload() {
  const result = await v$.value.$validate();
  if (result) {
    try {
      infoFormState.error = false;
      infoFormState.pending = true;

      await uploadStore.upload({
        ...infoFormState.data,
        tags: infoFormState.data.tags.join(','),
      } as Omit<BeatUpload, 'wave' | 'mp3' | 'image' | 'stems'>);

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
  value: string | number | null
) {
  infoFormState.data[field] = value;
}

const tagNameInputValue = ref('');

function updateTagNameInputValue(value: string) {
  tagNameInputValue.value = value;
}

function addTag() {
  infoFormState.data.tags.push(tagNameInputValue.value);
  tagNameInputValue.value = '';
}

onBeforeRouteLeave(() => {
  uploadStore.resetState();
});
</script>
