<template>
  <div class="w-[1480px] grow flex items-center justify-center gap-5 mb-[75px]">
    <FirstPage />
    <SecondPage />
  </div>
</template>
<script setup lang="ts">
import FirstPage from './components/modules/FirstPage/FirstPage.vue';
import SecondPage from './components/modules/SecondPage/SecondPage.vue';

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
