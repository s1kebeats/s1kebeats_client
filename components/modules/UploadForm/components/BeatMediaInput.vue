<template>
  <div
    class="relative overflow-hidden border-[1px] rounded-md transition-all"
    :class="error.state ? 'bg-red-100' : ''"
  >
    <div
      v-if="uploading"
      data-testid="loading"
      class="absolute z-[1] w-full h-full backdrop-blur-sm flex p-10 rounded-md"
    >
      <UiLoadingSpinner color="black" class="m-auto" size="lg" />
    </div>
    <label :for="name" class="cursor-pointer" data-testid="label">
      <div
        class="relative w-full h-full py-4 px-5 flex items-center justify-between gap-2"
      >
        <span
          v-if="required"
          class="absolute right-5 top-3 desktop-text-sm font-medium"
          data-testid="required"
          >*</span
        >
        <Icon
          v-if="icon || error.state"
          :name="error.state ? 'material-symbols:warning-rounded' : icon!"
          color="black"
          size="20%"
          class="min-w-[50px]"
        />
        <div class="grow flex flex-col text-center gap-1">
          <span class="link desktop-text-sm" data-testid="title">
            {{ error.state ? error.message : title }}</span
          >
          <span class="desktop-text-xs" data-testid="description">
            <template v-if="error.state && error.description">
              {{ error.description }}
            </template>
            <template v-if="!error.state && description">
              {{ description }}
            </template>
          </span>
        </div>
      </div>
      <div
        class="w-full bg-green-200 text-white text-center py-1.5 px-3 desktop-text-xs truncate"
      >
        {{ selected ? selected : 'Файл не выбран' }}
      </div>
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
    uploadStore.setBeatField(props.field, null);
    return;
  }
  if (props.maxSize && media.size > props.maxSize * 1024 * 1024) {
    selected.value = media.name;

    error.state = true;
    error.message = `Максимальный размер файла ${props.maxSize}мб.`;
    uploadStore.setBeatField(props.field, null);
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
    uploadStore.setBeatField(props.field, null);
  } finally {
    uploading.value = false;
  }
}
</script>
