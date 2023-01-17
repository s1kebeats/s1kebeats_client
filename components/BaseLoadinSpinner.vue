<template>
  <div class="spinner"></div>
</template>
<style scoped lang="scss">
.spinner {
  width: 20px;
  height: 20px;
  clear: both;
  margin: 0 auto;
  border: 2px rgba(white, 0.25) solid;
  border-top: 2px rgba(white, 1) solid;
  border-radius: 50%;
  -webkit-animation: spinnerRotation 0.6s infinite linear;
  animation: spinnerRotation 0.6s infinite linear;
}
@keyframes spinnerRotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
