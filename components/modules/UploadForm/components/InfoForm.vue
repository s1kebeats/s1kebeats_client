<template>
  <form class="flex flex-col gap-5">
    <fieldset class="flex gap-5 items-center">
      <ImagePreview />
      <fieldset class="h-full grow flex flex-col gap-5">
        <div class="flex gap-5">
          <UiTextInput
            type="text"
            placeholder="Введите название"
            class="h-full"
            name="beatName"
            title="Название"
            :focused="false"
          />
          <UiTextInput
            type="text"
            placeholder="Введите Bpm"
            name="beatBpm"
            title="Bpm"
            :focused="false"
          />
        </div>

        <UiTextArea
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
        type="text"
        placeholder="Введите цену за Wave"
        class="grow h-full"
        name="beatWavePrice"
        title="Цена за Wave"
        :focused="false"
      />
      <UiTextInput
        class="grow"
        type="text"
        placeholder="Введите цену за Trackout"
        name="beatTrackoutPrice"
        title="Цена за Trackout"
        :focused="false"
      />
    </fieldset>
    <div class="flex justify-between">
      <UiButton class="px-5" @click.prevent="uploadStore.decrementPage()">
        Назад
      </UiButton>
      <UiButton class="px-5" @click.prevent="uploadStore.incrementPage()">
        Далее
      </UiButton>
    </div>
  </form>
</template>
<script setup lang="ts">
import ImagePreview from './ui/ImagePreview.vue';
import useUploadStore from '@/components/modules/UploadForm/store';

const uploadStore = useUploadStore();
</script>
