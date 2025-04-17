<script setup lang="ts">
function clearForm(event) {
  const form = event.currentTarget.form
  if (!form) return;
  
  Array.from(form.elements).forEach(input => {
    if (input.value) input.value = '';
  })
}
</script>
<template>
  <DsfrButton secondary class="danger" type="submit" @click="clearForm">
    <slot></slot>
  </DsfrButton>
</template>
<style>
button.danger {
  --border-action-high-blue-france: var(--border-plain-error);
  --text-action-high-blue-france: var(--text-default-error);
  --hover-tint: var(--background-contrast-error-hover);
  --active-tint: var(--background-contrast-error-active);
}
</style>