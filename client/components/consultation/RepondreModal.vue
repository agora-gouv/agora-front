<script setup lang="ts">
const {open} = defineProps<{
  open: Ref<boolean>
  onClick: () => void
}>()
const emit = defineEmits<{
  (event: 'close'): void
}>()
</script>
<template>
  <DsfrModal
    :opened="open"
    title="Participer à la consultation"
    :actions="[{ label: 'Continuer sur le site', onClick: onClick }]"
    @close="() => emit('close')"
  >
    <p>
      Vous pouvez répondre à la consultation sur l'application mobile Agora ou sur le site internet. L'application mobile offre une
      meilleure expérience.
    </p>
    <p>L'application mobile vous permet de :</p>
    <ul>
      <li>Conserver vos résultats</li>
      <li>Etre tenu au courant des suites.</li>
    </ul>
  </DsfrModal>
</template>