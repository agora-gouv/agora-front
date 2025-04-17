<template>
  <div role="progressbar" aria-labelledby="loading-label">
    <span id="loading-label">Chargement...</span>
  </div>
</template>

<style>

[role="progressbar"]:not([aria-valuenow]) {
  width: 100%;
  display: grid;
  justify-items: center;
}

[role="progressbar"]:not([aria-valuenow])::after {
  content: "";
  height: 3em;
  aspect-ratio: 1;
  border: 5px solid var(--info-950-100);
  border-top-color: var(--info-425-625);
  border-bottom-color: var(--info-425-625);
  border-radius: 50%;
  animation: rotate linear 2s infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
<script setup lang="ts">
</script>