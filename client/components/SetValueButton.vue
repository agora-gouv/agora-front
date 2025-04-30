<script setup lang="ts">
const { for: target, value } = defineProps<{
  for: string,
  value: HTMLInputElement['value'],
}>()

const setValue = useSetFormValue(target, value)
</script>

<template>
  <DsfrButton
    tertiary
    type="button"
    @click="setValue"
    :aria-controls="target"
  >
    <slot></slot>
  </DsfrButton>
</template>