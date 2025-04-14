<script setup lang="ts">
defineProps<{
  date: string,
}>()

const toReadableDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }

  return new Date(date).toLocaleDateString("fr-FR", options)
}
</script>

<template>
  <time :datetime="new Date(date).toISOString()">{{ toReadableDate(date) }}</time>
</template>

<style lang="scss" scoped>
</style>