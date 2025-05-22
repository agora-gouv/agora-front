<script setup lang="ts">

definePageMeta({
  layout: 'basic',
})
useHead({
  title: 'Actions pour renforcer la démocratie - Agora'
})
</script>

<template>
  <h1 class="fr-mt-4w">Les actions en cours pour renforcer la démocratie</h1>
  <p>
    Comment faire vivre une démocratie plus ouverte, plus participative et plus proche des citoyens&nbsp;? Qu’il s’agisse du <i>Grand
    Débat</i>, des conventions citoyennes, de consultations ou de nouveaux outils numériques comme la plateforme Agora, l’État a mis en
    place plusieurs initiatives pour mieux associer les Français aux décisions publiques ces dernières années.
  </p>
  <p>
    Aujourd’hui, cette dynamique se poursuit avec de nouveaux chantiers structurants.
  </p>
  <h2 class="fr-mt-8w">Un nouveau plan pour un gouvernement ouvert</h2>
  <p>
    La France est membre du <dfn>Partenariat pour un Gouvernement Ouvert (<abbr>PGO</abbr>)</dfn> depuis <time datetime="2014">2014</time>. Ce partenariat international regroupe
    75 pays engagés à promouvoir la transparence, la participation citoyenne et la redevabilité des pouvoirs publics.
  </p>
  <DsfrQuote quote="
               La France est un fervent soutien du Partenariat pour un gouvernement ouvert. C'est le principal forum mondial pour que les gouvernements,
               la société civile, les citoyens et le secteur privé se rassemblent – non pas pour dire à chacun ce qu'il doit faire mais pour partager
               les innovations, les idées et les solutions de nature à améliorer nos pays. Nous devons tous être plus ambitieux.
               Nous devons tous prendre des risques, partager, apprendre et s'inspirer mutuellement
             "
             author="Emmanuel Macron, président de la République"
             source="Déclaration sur le Partenariat pour un gouvernement ouvert, à Paris, le 24 septembre 2020"
             sourceUrl="https://www.vie-publique.fr/discours/276468-emmanuel-macron-24092020-partenariat-pour-un-gouvernement-ouvert"
             quoteImage="/Macron.jpg"
             class="fr-mb-4w" />
  <p>En <time datetime="2024">2024</time>, la France a lancé son <a href="https://www.modernisation.gouv.fr/files/2024-03/Plan_Action_National_2024_2026_0.pdf">4e plan national d’action dans le cadre du <abbr>PGO</abbr></a>.</p>
  <h3 class="fr-mt-4w fr-mb-2w">Concrètement, la France s’est engagée à réaliser 17 actions&nbsp;:</h3>
  <h4 class="fr-mt-4w fr-mb-2w">Axe 1 : Améliorer et renforcer les pratiques de participation citoyenne et d’innovation démocratique</h4>
  <ul class="fr-mt-2w fr-mb-4w">
    <li>Former les agents publics aux méthodes participatives pour qu’ils puissent mieux associer les citoyens aux politiques publiques</li>
    <li>Créer un espace pérenne de dialogue entre l’État et la société civile pour co-construire, suivre et évaluer les politiques d’ouverture démocratique</li>
    <li>Accompagner les pays partenaires dans la mise en œuvre de pratiques démocratiques ouvertes et transparentes, en lien avec la politique d’aide au développement de la France</li>
    <li>Faciliter l’engagement citoyen en créant un statut du citoyen participant, c'est-à-dire un cadre protecteur et reconnu quand on participe à une démarche participative (indemnisation, congé citoyen, valorisation des compétences, etc.)</li>
  </ul>
  <h4 class="fr-mt-4w fr-mb-2w">Axe 2 : Promouvoir l’inclusion et l’engagement sur tout le territoire</h4>
  <ul class="fr-mt-2w fr-mb-4w">
    <li>Favoriser l’engagement des jeunes en les sensibilisant au fonctionnement démocratique à l’aide d’un outil pédagogique interactif inspiré de la <i>«&nbsp;Fresque du Climat&nbsp;»</i></li>
    <li>Rendre l’inscription sur les listes électorales plus simple et intuitive grâce à un parcours numérique pensé autour des moments de vie clés</li>
    <li>Permettre aux citoyens de contribuer à l’amélioration concrète des services publics en partageant leurs idées et expériences sur <a
      href="https://www.plus.transformation.gouv.fr/"><i>Services Publics +</i></a></li>
    <li>Co-construire localement des projets scolaires avec la communauté éducative pour favoriser la réussite et le bien-être des élèves</li>
    <li>Impliquer tous les acteurs (citoyens, entreprises, collectivités) dans la transition écologique grâce à des outils pédagogiques et des démarches participatives à l’échelle locale</li>
    <li>Développer la culture numérique et de l’<abbr>IA</abbr> à travers des actions pédagogiques, participatives et ouvertes à tous pour mieux comprendre les enjeux et usages des données</li>
    <li>Protéger les citoyens contre la désinformation en diffusant des contenus pédagogiques fiables et en valorisant l’expertise des acteurs publics et associatifs</li>
  </ul>
  <h4 class="fr-mt-4w fr-mb-2w">Axe 3 : Mettre le numérique au service d’une action publique plus transparente et plus participative.</h4>
  <ul class="fr-mt-2w fr-mb-4w">
    <li>Permettre à chacun de suivre les résultats concrets de l’action publique dans son territoire via un <a
      href="https://www.info.gouv.fr/politiques-prioritaires">baromètre en ligne, actualisé et accessible</a></li>
    <li>Organiser régulièrement des consultations citoyennes nationales pour recueillir des avis sur les politiques majeures en cours de construction</li>
    <li>Soutenir les logiciels libres et les projets numériques d’intérêt général en facilitant leur adoption dans les services publics et leur collaboration avec l’État</li>
    <li>Améliorer la transparence de l’aide publique au développement</li>
    <li>Permettre aux citoyens de <a href="https://participationcitoyenne.ccomptes.fr/">proposer des sujets de contrôle à la Cour des comptes</a> et de suivre leur traitement jusqu’à publication</li>
  </ul>
  <a href="https://www.modernisation.gouv.fr/files/2024-03/Plan_Action_National_2024_2026_0.pdf"
     target="_blank"
     class="fr-link"
     rel="noreferrer noopener">
    Consulter la liste détaillée des 17 engagements du plan <abbr>PGO</abbr> <time>2024-2026</time>
  </a>
  
  <h2 class="fr-pt-8w">La publication des cahiers de doléances du <i>Grand débat</i></h2>
  <p>
    Dans le cadre du <i>Grand Débat national</i> en <time datetime="2019">2019</time>, plus de 20 000 cahiers de doléances ont été remplis
    par les citoyens dans les mairies de France. Seuls les chercheurs y ont eu accès pendant plusieurs années, notamment pour des questions
    juridiques. Ces documents constituent un témoignage inédit de la parole citoyenne et des aspirations des Français. Ils sont désormais
    accessibles à tous dans les archives nationales et départementales, et seront bientôt consultables directement sur Internet.
    C’est une nouvelle étape pour valoriser pleinement cette parole et en tirer des enseignements pour l’action publique.
  </p>
  
  <ol class="fr-mt-2w fr-mb-4w">
    <li><b><time datetime="2025-01">Janvier 2025</time>&nbsp;:</b> annonce par le Premier ministre François Bayrou de la reprise de l’étude des cahiers de doléances dans son discours de politique générale.</li>
    <li><b><time datetime="2025-04-29">29 avril 2025</time>&nbsp;:</b> ouverture immédiate à tous les citoyens des cahiers de doléances, grâce à un arrêté publié au <i>Journal officiel</i>.</li>
    <li><b><time datetime="2025-05">Mai 2025</time>&nbsp;:</b> lancement du groupe de travail parlementaire chargé de rendre ces doléances lisibles, exploitables et ouvertes à tous d’ici <time datetime="2026">2026</time>.</li>
  </ol>

  <DsfrQuote quote="
               FIXME
             "
             author="Patrick Mignola, Ministre délégué auprès du Premier ministre, chargé des Relations avec le Parlement"
             quoteImage="/Mignola.jpg"
             class="fr-mb-4w" />

   <div class="bandeau-cta fr-grid-row fr-grid-row--gutters fr-p-5w">
    <img src="@gouvfr/dsfr/dist/artwork/pictograms/digital/application.svg" alt="" class="fr-col-1 fr-py-0">
    <p class="fr-h3 fr-col-11 fr-m-0 fr-py-0">Téléchargez l’application Agora pour être prévenu(e) dès que les cahiers de doléance sont en ligne&nbsp;!</p>
   </div>
  
  <h2 class="fr-pt-8w">Une nouvelle convention citoyenne à l’automne</h2>
  <p>Les conventions citoyennes sont devenues, en quelques années, un format incontournable de la démocratie participative en France.</p>
  <ul class="fr-mt-2w fr-mb-4w">
    <li>La <b><i>Convention citoyenne pour le climat</i></b> (2019-2020) a débouché sur de nombreuses mesures intégrées à la loi <i>Climat et Résilience</i>.</li>
    <li>Les conclusions des travaux de la <b><i>Convention sur la fin de vie</i></b> (2022-2023) sont actuellement débattues à l’Assemblée nationale.</li>
  </ul>
  <p class="fr-mb-8w">
    En automne 2025, une nouvelle convention sera organisée sur le thème des temps de l’enfant : rythmes scolaires, temps extrascolaires,
    conciliation avec la vie familiale&hellip; Ce sujet, au croisement de l’éducation, du bien-être et de l’organisation de la société,
    mobilisera à nouveau un panel de citoyens tirés au sort pour formuler des recommandations concrètes.
  </p>
  <BandeauTelechargementAdaptatif title="Activez les notifications sur l'application Agora pour ne rien louper." />
</template>

<style>
h2, .fr-h3 {
  color: var(--blue-france-sun-113-625);
}

.bandeau-cta {
  background-color: var(--blue-france-975-75);
  align-items: center;
}

.bandeau-cta img {
  height: 100%;
}

ol {
  list-style-type: var(--ul-type);
}
ol > li::marker {
  content: revert;
}

 {
  color: var(--blue-france-sun-113-625);
}
</style>