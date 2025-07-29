<script setup lang="ts">

defineProps<{
  shareText: string,
  shareTitle: string,
}>()

</script>

<template>
  <div class="fr-share" id="share-7093">
    <p class="fr-share__title">Partager la page</p>
    <ul class="fr-btns-group">
      <li>
        <a class="fr-btn--facebook fr-btn" target="_blank" rel="noopener" title="Partager sur Facebook - nouvelle fenêtre" id="share-7094"
           onclick="window.open(this.href,'Partager sur Facebook','toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=450'); event.preventDefault();"
           :href="'https://www.facebook.com/sharer.php?description=' + shareText">
          Partager sur Facebook
        </a>
      </li>
      <li>
        <!-- Les paramètres de la reqûete doivent être URI-encodés (ex: encodeURIComponent() en js) -->
        <a class="fr-btn--twitter-x fr-btn" target="_blank" rel="noopener" title="Partager sur Twitter - nouvelle fenêtre"
           id="share-7095"
           onclick="window.open(this.href,'Partager sur X (anciennement Twitter)','toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=420'); event.preventDefault();"
           :href="`https://twitter.com/intent/tweet?&text=${shareText}&hashtags=agora`">
          Partager sur X (anciennement Twitter)
        </a>
      </li>
      <li>
        <a class="fr-btn--linkedin fr-btn" target="_blank" rel="noopener" title="Partager sur LinkedIn - nouvelle fenêtre" id="share-7096"
           onclick="window.open(this.href,'Partager sur LinkedIn','toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=550,height=550'); event.preventDefault();"
           :href="`https://www.linkedin.com/shareArticle?summary=${shareText}&title=${shareTitle}`">
          Partager sur LinkedIn
        </a>
      </li>
      <li>
        <a class="fr-btn--mail fr-btn" target="_blank" rel="noopener external" title="Partager par courriel - nouvelle fenêtre"
           id="share-7097"
           :href="`mailto:?subject=${shareTitle}&body=${shareText}`">
          Partager par email
        </a>
      </li>
      <li>
        <button class="fr-btn--copy fr-btn" id="share-7098"
                onclick="navigator.clipboard.writeText(window.location).then(function() {alert('Adresse copiée dans le presse papier.')});">
          Copier dans le presse-papier
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
