<script setup lang="ts">
import { Ref } from 'vue'

definePageMeta({
  layout: 'basic',
})

useHead({
  title: 'Agora - Mentions légales',
})

const domainName = useRuntimeConfig().public.domainName
const links: Ref<any[]> = ref([{to: '/', text: 'Accueil'}, {text: 'Mentions légales'}])
</script>

<template>
  <DsfrBreadcrumb :links="links"/>
  <div class="fr-mt-8w">
    <h1>Mentions légales de l'application</h1>
    <h2>Éditeur</h2>
    <p>
      Agora est édité par :<br/>
      La Direction interministérielle de la transformation publique (DITP) :<br/>
      Ensemble Fontenoy Ségur - 20 avenue de Ségur<br/>
      75007 Paris<br/>
      01 79 84 33 00
    </p>
    <h2>Directeur de la publication</h2>
    <p>
      Le directeur de la publication est Thierry Lambert, délégué interministériel de la transformation publique.
    </p>
    <h2>Hébergement de l'application</h2>
    <p>
      Cette application est hébergée en propre par :<br/>
      Scalingo<br/>
      <a href="https://scalingo.com/fr/"
         target="_blank" rel="external">https://scalingo.com/fr/</a><br/>
      15 avenue du Rhin<br/>
      67100 Strasbourg<br/>
      France<br/>
    </p>
    <h2>Accessibilité</h2>
    <p>
      La conformité aux normes d'accessibilité numérique est en cours. L'objectif de rendre cette application accessible à toutes et tous
      est une priorité.
    </p>
    <h2>En savoir plus</h2>
    <p>
      Pour en savoir plus sur la politique d’accessibilité numérique de l’État : <a
      href="http://references.modernisation.gouv.fr/accessibilite-numerique"
      target="_blank" rel="external">http://references.modernisation.gouv.fr/accessibilite-numerique</a>
    </p>
    <h2>Signaler un dysfonctionnement</h2>
    <p>
      Si vous rencontrez un défaut d’accessibilité vous empêchant d’accéder à un contenu ou une fonctionnalité de l’application, merci de
      nous en faire part à l’e-mail où nous tâcherons de vous répondre dans les plus brefs délais : <a href="mailto:agora@beta.gouv.fr"
                                                                                                       target="_blank" rel="external">agora@beta.gouv.fr</a>.<br/><br/>
      Si vous n’obtenez pas de réponse rapide de notre part, vous êtes en droit de faire parvenir vos doléances ou une demande de saisine au
      Défenseur des droits.<br/><br/>
      Pour le joindre, vous pouvez :
      <ul>
        <li>Utiliser le formulaire de contact en ligne ici : <a
          href="https://formulaire.defenseurdesdroits.fr/code/afficher.php?ETAPE=accueil_2016"
          target="_blank" rel="external">https://formulaire.defenseurdesdroits.fr/code/afficher.php?ETAPE=accueil_2016</a></li>
        <li>Composer le 09 69 39 00 00 (du lundi au vendredi de 8h à 20h)</li>
        <li>Envoyer un courrier (sans timbre) à l’adresse suivante : Défenseur des droits, Libre réponse 71120, 75342 Paris CEDEX 07.</li>
      </ul>
    </p>
    <h2>Sécurite</h2>
    <p>
      L’application est protégée par un certificat électronique, matérialisé pour la grande majorité des navigateurs par un cadenas. Cette
      protection participe à la confidentialité des échanges. En aucun cas les services associés à l’application ne seront à l’origine
      d’envoi de courriels pour demander la saisie d’informations personnelles.
    </p>
  </div>
</template>