<template>
  <div class="grow flex flex-col">
    <div
      v-if="uploading"
      class="w-full h-full border-[1px] flex flex-col items-center justify-center p-10 rounded-md transition-all"
    >
      <UiLoadingSpinner color="black" size="xl" />
    </div>
    <label
      v-else
      :for="name"
      v-bind="$attrs"
      class="relative w-full h-full border-[1px] flex flex-col items-center justify-center p-10 cursor-pointer rounded-md transition-all"
      :class="error.state ? 'bg-red-100 border-red-500' : ''"
    >
      <span v-if="required" class="absolute right-7 top-5 text-xl font-medium"
        >*</span
      >
      <template v-if="error.state">
        <Icon
          name="material-symbols:warning-rounded"
          color="black"
          size="90px"
        />
        <span class="font-semibold">
          {{ error.message }}
        </span>
      </template>
      <template v-else>
        <Icon
          v-if="icon"
          :name="icon"
          height="90px"
          width="90px"
          class="mb-3"
        />
        <div class="flex flex-col items-center gap-1 mb-3">
          <span class="text-2xl font-semibold"> {{ title }}</span>
          <span class="text-xs" v-if="description"> {{ description }}</span>
        </div>
        <div
          v-show="selected"
          class="absolute bottom-5 bg-black text-white rounded-lg py-1 px-3 text-sm max-w-[200px] truncate"
        >
          {{ selected }}
        </div>
      </template>
    </label>
    <input
      ref="inputElement"
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
}>({
  state: false,
  message: null,
  status: null,
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
