<!-- 
/upload

auth: true;

body: {

name: string;
wavePrice: decimal string;
stemsPrice?: string containing "stems/", required if stems provided;
bpm?: decimal string;
description?: string;

} -->

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

        <UiTextInput
          type="text"
          placeholder="Введите описание"
          class="w-full h-full max-h-[152px]"
          name="beatDescription"
          title="Description"
          :focused="false"
        />
      </fieldset>
    </fieldset>
    <UiTextInput
      type="text"
      placeholder="Введите цену за Wave"
      class="h-full"
      name="beatWavePrice"
      title="Цена за Wave"
      :focused="false"
    />
    <UiTextInput
      type="text"
      placeholder="Введите цену за Trackout"
      name="beatTrackoutPrice"
      title="Trackout Price"
      :focused="false"
    />

    <UiTextInput
      type="text"
      placeholder="Введите описание"
      name="beatDescription"
      title="Description"
      :focused="false"
    />
  </form>
</template>
<script setup lang="ts">
import ImagePreview from './ui/ImagePreview.vue';
</script>
