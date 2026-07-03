<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  url: string
}>()

const mainVideo = ref<HTMLVideoElement | null>(null)
const bgVideo = ref<HTMLVideoElement | null>(null)

const syncPlay = async () => {
  if (!mainVideo.value || !bgVideo.value) return

  try {
    await bgVideo.value.play()
  } catch (e) {
    console.warn('BG video play failed:', e)
  }
}

const syncPause = () => {
  if (!mainVideo.value || !bgVideo.value) return
  bgVideo.value.pause()
}

const syncTime = () => {
  if (!mainVideo.value || !bgVideo.value) return
  bgVideo.value.currentTime = mainVideo.value.currentTime
}
</script>

<template>
  <div class="video-container">
    <video
      ref="bgVideo"
      class="video-bg"
      :src="url"
      muted
      playsinline
    />

    <video
      ref="mainVideo"
      class="video-main"
      controls
      :src="url"
      @play="syncPlay"
      @pause="syncPause"
      @timeupdate="syncTime"
    />
  </div>
</template>

<style lang="scss" scoped>
.video-container {
  position: relative;
  height: 70vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
}

.video-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  filter: blur(40px);
  transform: scale(1.3);

  z-index: 0;
  pointer-events: none;
}

.video-container::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1;
}

.video-main {
  position: relative;
  z-index: 2;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}
</style>