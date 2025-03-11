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
    <img class="fr-my-3w" v-if="imageUrl" :src="imageUrl" alt="">

    <DsfrTranscription v-if="imageTranscription" @click.prevent title="Transcription" :content="imageTranscription"/>
  </div>
</template>

<style lang="scss" scoped>
</style>