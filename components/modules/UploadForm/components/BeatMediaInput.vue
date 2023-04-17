<template>
  <div
    class="relative flex flex-col border-[1px] rounded-md transition-all"
    :class="error.state ? 'bg-red-100 border-red-500' : ''"
  >
    <div
      v-if="uploading"
      data-testid="loading"
      class="absolute z-[1] w-full h-full backdrop-blur-sm flex items-center justify-center p-10 rounded-md"
    >
      <UiLoadingSpinner color="black" size="xl" />
    </div>
    <label
      :for="name"
      class="relative w-full h-full flex flex-col items-center justify-center p-10 cursor-pointer"
      data-testid="label"
    >
      <span
        v-if="required"
        class="absolute right-7 top-5 text-xl font-medium"
        data-testid="required"
        >*</span
      >
      <template v-if="error.state">
        <Icon
          name="material-symbols:warning-rounded"
          color="black"
          size="90px"
        />
        <div class="flex flex-col items-center gap-1 mb-3">
          <span class="text-2xl font-semibold" data-testid="title">
            {{ error.message }}</span
          >
          <span
            class="text-xs"
            v-if="error.description"
            data-testid="description"
          >
            {{ error.description }}</span
          >
        </div>
      </template>
      <template v-else>
        <Icon
          v-if="icon"
          :name="icon"
          height="90px"
          width="90px"
          class="mb-3"
          data-testid="icon"
        />
        <div class="flex flex-col items-center gap-1 mb-3">
          <span class="text-2xl font-semibold" data-testid="title">
            {{ title }}</span
          >
          <span class="text-xs" v-if="description" data-testid="description">
            {{ description }}</span
          >
        </div>
        <div
          v-show="selected"
          class="absolute bottom-5 bg-black text-white rounded-lg py-1 px-3 text-sm max-w-[40%] truncate"
        >
          {{ selected }}
        </div>
      </template>
    </label>
    <input
      ref="inputElement"
      data-testid="fileInput"
      :name="name"
      :id="name"
      type="file"
      class="hidden"
      :accept="accept"
      @input="updateMedia"
    />
  </div>
</template>
<script setup lang="ts">
import BeatUpload from '@/api/models/BeatUpload';
import uploadMedia from '../api/uploadMedia';
import useUploadStore from '../store';
const uploadStore = useUploadStore();

const emit = defineEmits<{
  (e: 'updateValue'): void;
}>();

const props = defineProps<{
  title: string;
  description?: string;
  name: string;
  icon?: string;
  accept: string;
  required?: boolean;
  field: keyof BeatUpload;
  maxSize?: number;
}>();

const inputElement = ref<HTMLInputElement>();

const error = reactive<{
  state: boolean;
  message: string | null;
  status: string | null;
  description: string | null;
}>({
  state: false,
  message: null,
  status: null,
  description: null,
});
const selected = ref<string | null>(null);
const uploading = ref(false);

function updateMedia(e: Event) {
  const input = e.target as HTMLInputElement;
  if (input.files) {
    upload(input.files[0]);
  }
}

async function upload(media: File) {
  if (selected.value === media.name) return;
  if (
    !props.accept.includes(media.name.substring(media.name.lastIndexOf('.')))
  ) {
    selected.value = media.name;

    error.state = true;
    error.message = 'Неверный формат файла';
    error.description = `Выберите ${props.accept.split(',').join(' / ')} файл`;
    return;
  }
  if (props.maxSize && media.size > props.maxSize * 1024 * 1024) {
    selected.value = media.name;

    error.state = true;
    error.message = `Максимальный размер файла ${props.maxSize}мб.`;
    return;
  }
  try {
    selected.value = media.name;
    emit('updateValue');

    error.state = false;
    error.message = null;
    error.status = null;

    uploading.value = true;

    const url = await uploadMedia(props.field, media);
    uploadStore.setBeatField(props.field, url);
  } catch (e: any) {
    error.state = true;
    error.message = e.response.data.message ?? null;
    error.status = e.response.status ?? null;
  } finally {
    uploading.value = false;
  }
}
</script>
