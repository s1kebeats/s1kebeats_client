<template>
  <div class="relative">
    <ProfileButton />
    <ProfileOverlay :show="showProfileOverlay" />
  </div>
</template>
<script setup lang="ts">
import ProfileOverlay from './ProfileOverlay.vue';
import useAuthStore from '~~/stores/auth';
import ProfileButton from './ProfileButton.vue';
const authStore = useAuthStore();
const showProfileOverlay = ref(false);
const toggleProfileOverlay = () => {
  showProfileOverlay.value = !showProfileOverlay.value;
};
function closeProfileOverlay() {
  setTimeout(toggleProfileOverlay, 200);
}
</script>
