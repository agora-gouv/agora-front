<script setup lang="ts">
defineProps<{
  previousQuestion: () => void
}>()

const scrollToTop = () => {
  document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })
}

</script>

<template>
  <div>
    <DsfrButton type="button" class="fr-btn fr-btn--secondary fr-mr-4w fr-mt-2w" @click="previousQuestion(); scrollToTop()">Question
      précédente
    </DsfrButton>
  </div>
</template>

<style>
</style>