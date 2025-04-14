<script setup lang="ts">
defineProps<{
  url: string,
}>()
</script>

<template>
  <video controls class="fr-responsive-id fr-responsive-vid__player fr-content-media">
    <source :src=url type="video/mp4"/>
  </video>
</template>

<style lang="scss" scoped>
div video:not([href])[controls] {
  cursor: auto;
  max-height: 70vh;
  background-color: rgb(0, 0, 0);
}
</style>