<script setup lang="ts">
const { for: target, value } = defineProps<{
  for: string,
  value: HTMLInputElement['value'],
}>()

function setValue(event) {
  const form = event.currentTarget.form
  if (!form || !form.elements[target]) return;

  form.elements[target].value = value
  form.elements[target].focus()
}
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