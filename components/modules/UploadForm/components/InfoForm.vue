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
  <form class="grow flex flex-col gap-5 h-[600px]">
    <ImagePreview />
    <UiTextInput
      type="text"
      placeholder="Введите название бита"
      name="beatName"
      title="Name"
      :focused="false"
    />
    <UiTextInput
      type="text"
      placeholder="Введите цену за Wave бита"
      name="beatWavePrice"
      title="Wave Price"
      :focused="false"
    />
    <UiTextInput
      type="text"
      placeholder="Введите цену за Trackout бита"
      name="beatTrackoutPrice"
      title="Trackout Price"
      :focused="false"
    />
    <UiTextInput
      type="text"
      placeholder="Введите Bpm"
      name="beatBpm"
      title="Bpm"
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
