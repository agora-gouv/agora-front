<script setup lang="ts">
const { open } = defineProps<{
  open: Ref<boolean>
}>()
const emit = defineEmits<{
  (event: 'close'): void
}>()
</script>

<template>
  <DsfrModal
    :opened="open"
    title="De quoi s'agit-il ?"
    :actions="[{ label: 'J\'ai compris', onClick: () => emit('close') }]"
    @close="() => emit('close')"
  >
    <p>
      Les catégories socio-professionnelles sont des regroupements effectués par l'<abbr>INSEE</abbr> (l'Institut national de la statistique
      et des études économiques) pour regrouper la population en fonction de leur activité professionnelle et de leur position sociale.
      Cela permet de comprendre la structure de la population. Si vous avez un doute sur la vôtre, pas d'inquiétude, sélectionnez simplement
      l'option "Je ne sais pas".
    </p>
  </DsfrModal>
</template>