<script setup lang="ts">
const { lineCount = 0 } = defineProps<{ lineCount?: number }>()
</script>

<template>
  <span aria-busy="true" class="skeleton" :style="`--line-count: ${lineCount}`"></span>
</template>

<style>
.skeleton {
  --line-count: 0;
  min-height: calc(var(--line-count) * 1.2em);
}
@supports (min-height: calc(var(--line-count) * 1lh)) {
  .skeleton {
    min-height: calc(var(--line-count) * 1lh);
  }
}

.skeleton {
  position: relative;
  overflow: hidden;
  border-radius: .2em;
}
.skeleton::before {
  content: "";
  z-index: 1;
  position: absolute;
  inset: 0;
}
.skeleton::after {
  content: "";
  position: absolute;
  inset: -100%;
  z-index: 2;
}

.skeleton::before {
  background-color: var(--background-disabled-grey);
}
.skeleton::after {
  background: linear-gradient(.2turn, transparent 40%, var(--text-disabled-grey) 50%, transparent 60%);
  opacity: .5;
  animation: skeleton 2s infinite ease-in-out;
}
@keyframes skeleton {
  from {
    transform: translateX(-30%);
  }
  to {
    transform: translateX(30%);
  }
}
</style>