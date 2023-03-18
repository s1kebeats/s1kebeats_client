<template>
    <div class="w-[1480px] grow flex flex-col gap-5 pb-[75px]">
      <div class="grow flex flex-col gap-5">
        <div class="grow flex gap-5">
          <div class="box-top w-[10%] rounded-lg"></div>
          <Mp3Input @update-value="updateBeatMedia('mp3', $event)" />
          <WavInput @update-value="updateBeatMedia('wav', $event)" />
        </div>
        <div class="grow flex gap-5">
          <ImageInput @update-value="updateBeatMedia('image', $event)" />
          <StemsInput @update-value="updateBeatMedia('stems', $event)" />
          <div class="box-bottom w-[10%] rounded-lg"></div>
        </div>
      </div>
      <div class="flex justify-end">
        <UiButton class="px-5 bg-black">Далее</UiButton>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import Mp3Input from './components/Mp3Input.vue';
  import WavInput from './components/WavInput.vue';
  import ImageInput from './components/ImageInput.vue';
  import StemsInput from './components/StemsInput.vue';
  
  import BeatUpload from '@/api/models/';
  
  const beat = reactive<BeatUpload>({
    name: '',
    bpm: null,
    description: '',
    wavePrice: null,
    stemsPrice: null,
    wav: null,
    mp3: null,
    stems: null,
    image: null,
  });
  const updateBeatMedia = async (
    field: 'stems' | 'image' | 'wav' | 'mp3',
    value: File
  ) => {
    beat[field] = value;
  };
  const updateBeatInfo = (
    field: 'name' | 'bpm' | 'description' | 'wavePrice' | 'stemsPrice',
    value: number | string
  ) => {
    beat[field] = value;
  };
  </script>
  <style lang="scss">
  .box-top {
    background: rgb(121, 69, 252);
    background: linear-gradient(
      120deg,
      rgba(121, 69, 252, 1) 0%,
      rgba(0, 0, 0, 1) 80%
    );
  }
  .box-bottom {
    background: rgb(121, 69, 252);
    background: linear-gradient(
      120deg,
      rgba(0, 0, 0, 1) 30%,
      rgba(121, 69, 252, 1) 90%
    );
  }
  </style>
  