<script setup lang="ts">
const {
  lineCount,
  characterCount,
  fullWidth = false,
  aspectRatio = '',
} = defineProps<{ lineCount?: number, characterCount?: number, fullWidth?: boolean, aspectRatio?: string }>()
</script>

<template>
  <span aria-busy="true" class="skeleton" :style="`
    --line-count: ${lineCount ?? 'initial'};
    --character-count: ${characterCount ?? 'initial'};
    --aspect-ratio: ${aspectRatio ?? 'initial'};
    --full-width: ${fullWidth ? '100%' : 'initial'};`"></span>
</template>

<style>
:where(.skeleton) {
  border-radius: .2em;
}

.skeleton {
  position: relative;
  display: inline-flex;
  overflow: hidden;
  min-width: 0;
  width: var(--full-width);
  max-width: 100%;
}
.skeleton {
}
.skeleton::before {
  all: revert;
  display: block;
  /* NOTE (GAFI 04-06-2025): Workaround pour le DSFR */
  content: "" !important;
  height: calc(var(--line-count) * 1.2em);
  width: var(--full-width, calc(var(--character-count) * 1ch));
  aspect-ratio: var(--aspect-ratio, );
}
@supports (height: calc(var(--line-count) * 1lh)) {
  .skeleton::before {
    height: calc(var(--line-count) * 1lh);
  }
}

.skeleton::after {
  content: "";
  position: absolute;
  inset: -100%;
  z-index: 2;
}

.skeleton::after {
  background: linear-gradient(.2turn, var(--background-disabled-grey) 40%, var(--text-disabled-grey) 50%, var(--background-disabled-grey) 60%);
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