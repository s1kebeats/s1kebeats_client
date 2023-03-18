<template>
  <div class="w-[1480px] grow flex items-center justify-center gap-5 pb-[75px]">
    <UploadVersionCard icon="material-symbols:unarchive-outline-rounded">
      Mp3, Wav, Stems 
    </UploadVersionCard>
  </div>
</template>
<script setup lang="ts">
import UploadVersionCard from './components/ui/UploadVersionCard.vue';

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
