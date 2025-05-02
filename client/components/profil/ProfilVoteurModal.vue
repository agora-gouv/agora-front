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
    title="Pourquoi me demande-t-on cela ?"
    :actions="[{ label: 'J\'ai compris', onClick: () => emit('close') }]"
    @close="() => emit('close')"
  >
    <p>
      Ces questions nous aident à comprendre si nous arrivons à toucher tous les publics, peu importe que vous soyez pour ou contre l'action
      du Gouvernement
    </p>
    <p>
      Notre objectif est de faire en sorte que des citoyens de toutes sensibilités partisanes, de tous âges et de tous horizons puissent
      s'intéresser et participer à la vie politique.
    </p>
    <p>
      Nous espérons que cette application permettra, petit à petit, de faire reculer l'abstention et peut-être, de motiver certains
      utilisateurs à s'engager, que ce soit sur le terrain ou en ligne.
    </p>
  </DsfrModal>
</template>