<script setup lang="ts">
defineProps<{
  description: string,
  imageTranscription?: string,
  imageUrl?: string,
}>()
</script>

<template>
  <div>
    <div v-html="description"></div>
    <img class="fr-my-3w" :src="imageUrl" alt="">

    <DsfrTranscription @click.prevent title="Transcription" :content="imageTranscription"/>
  </div>
</template>

<style lang="scss" scoped>
</style>