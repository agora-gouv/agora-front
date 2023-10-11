<script setup lang="ts">
import { Ref } from 'vue'

definePageMeta({
  layout: 'basic',
})

useHead({
  title: 'Agora - Politique de confidentialité',
})

const domainName = useRuntimeConfig().public.domainName
const links: Ref<any[]> = ref([{to: '/', text: 'Accueil'}, {text: 'Politique de confidentialité'}])
</script>

<template>
  <DsfrBreadcrumb :links="links"/>
  <div class="fr-mt-8w">
    <h1>Politique de confidentialité</h1>
    <h2>Qui est responsable d’Agora ?</h2>
    <p>
      Agora est une application gouvernementale visant à faire dialoguer les citoyens avec le Gouvernement.<br/><br/>
      Elle permet aux citoyens de participer à des consultations initiées par les ministères et de poser des questions au Gouvernement sur
      l’action gouvernementale.<br/><br/>
      Agora est développée au sein de l’incubateur de services numériques de la Direction interministérielle du numérique - Beta.gouv et
      mise en œuvre par, et sous la responsabilité, de la délégation interministérielle de la transformation publique (DITP).
    </p>
    <h2>Quelles sont les fonctionnalités de l’application Agora ?</h2>
    <p>
      L’application Agora permet aux Utilisateurs de :
      <ul>
        <li>Partager leurs idées et opinions concernant la mise en œuvre de certaines politiques publiques du Gouvernement ;</li>
        <li>Répondre aux consultations proposées par le Gouvernement et consulter les résultats de ces consultations ;</li>
        <li>Poser des Questions citoyennes au Gouvernement, qui obtiendront, pour les plus populaires d’entre elles, selon des modalités
          précisées par ailleurs, une réponse du Gouvernement ;
        </li>
        <li>Évaluer et améliorer l’application Agora.</li>
      </ul>
      <br/>
      L’application Agora permet à l’équipe produit d’Agora d’analyser les résultats des consultations proposées par le Gouvernement.
    </p>
    <h2>Quelles sont les données traitées, pour quelles finalités et sur quel fondement juridique ?</h2>
    <p>
      <div class="fr-table">
        <table class="simple-table">
          <thead>
          <tr>
            <th>
              Donnée traitée
            </th>
            <th>
              Finalité poursuivie
            </th>
            <th>
              Durée de conversation de la donnée
            </th>
            <th>
              Qui a accès à cette donnée
            </th>
            <th>
              Autre précision
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <ul>
                <li>Prénom de l'utilisateur</li>
              </ul>
            </td>
            <td>Pouvoir répondre à la question au Gouvernement posée par l’Utilisateur en l’appelant par son prénom.</td>
            <td>8 jours puis effacement.</td>
            <td>Tous les Utilisateurs de l’application car cette donnée est publiée avec la Question, l’équipe produit d’Agora qui ont
              besoin
              des données dans leurs missions, notamment les modérateurs, les équipes techniques dont les sous-traitants et les personnes
              chargées de l’analyse des données.
            </td>
            <td>Données recueillies à titre facultatif.</td>
          </tr>
          <tr>
            <td>
              Données de profil
              <ul>
                <li>Année de naissance ;</li>
                <li>Département ou territoire d’outre-mer de résidence ;</li>
                <li>Type de cadre de vie (milieu urbain, milieu rural, autre / je ne sais pas) ;</li>
                <li>Catégorie socio-professionnelle parmi les 8 catégories INSEE agrégées ;</li>
                <li>Rapport au vote ;</li>
                <li>Modalités d’engagement sur le terrain ;</li>
                <li>Modalités d’engagement en ligne.</li>
              </ul>
            </td>
            <td>Permettre d’analyser au mieux les résultats des consultations proposées par le Gouvernement et les questions posées au
              Gouvernement.
            </td>
            <td>Pendant la durée de l’inscription de l’Utilisateur à l’application ; soit au plus 24 mois après la dernière utilisation de
              l’application par l’Utilisateur.
            </td>
            <td>L’équipe produit d’Agora et les sous-traitants chargés de l’hébergement et de la sécurité des données.</td>
            <td>Données recueillies à titre facultatif.<br/><br/>
              L’analyse des résultats des consultations et des questions au Gouvernement se fait à des fins statistiques et de façon
              anonyme.
            </td>
          </tr>
          <tr>
            <td>
              <ul>
                <li>User ID</li>
              </ul>
            </td>
            <td>Attribué par l’application pour permettre de répondre aux consultations proposées par le Gouvernement et poser des questions
              au Gouvernement
            </td>
            <td>Pendant la durée de l’inscription de l’Utilisateur à l’application ; soit au plus tard 24 mois après la dernière utilisation
              de l’application par l’Utilisateur, puis effacement.
            </td>
            <td>L’équipe produit d’Agora, les sous-traitants chargés de l’analyse des contributions et de l’hébergement et de la sécurité
              des données.
            </td>
            <td>Dans les champs libres d’expression pour les réponses aux consultations et pour poser des questions, il convient de ne pas
              intégrer des données à caractère personnel sous peine de les voir supprimées par le dispositif de modération.
            </td>
          </tr>
          <tr>
            <td>
              <ul>
                <li>Adresse e-mail</li>
              </ul>
            </td>
            <td>Contacter l’Utilisateur pour l’inviter à participer à des ateliers de travail avec l’équipe produit d’Agora pour améliorer
              l’application.
            </td>
            <td>Pendant la durée de l’inscription de l’Utilisateur à l’application ; soit au plus tard 24 mois après la dernière utilisation
              de l’application par l’Utilisateur, puis effacement.
            </td>
            <td>L’équipe produit d’Agora</td>
            <td>Données fournies par l’Utilisateur sur la base du volontariat.<br/><br/>
              L’adresse e-mail et les remarques sur l’application ne sont pas croisée avec les autres informations collectées.
            </td>
          </tr>
          <tr>
            <td colspan="5">
              Les réponses aux consultations sont supprimées à la fin de la consultation et après production de la synthèse.
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      L’Utilisateur s’assure de ne pas communiquer de données à caractère personnel ou sensibles le concernant ou concernant des tiers,
      notamment les données qui révèlent l'origine raciale ou ethnique supposée, les opinions politiques, les convictions religieuses ou
      philosophiques ou l'appartenance syndicale, des données concernant la santé ou des données concernant la vie sexuelle ou l'orientation
      sexuelle d'une personne physique.<br/>
      Toute information transmise par l'Utilisateur est de sa seule responsabilité. L'Utilisateur s'engage à ne pas publier des contenus ou
      des informations contraires aux dispositions légales et réglementaires en vigueur. Dans le cas contraire, l’Editeur se réserve le
      droit de supprimer ces contenus.<br/>
      Les traitements des données à caractère personnel effectués à partir de la plateforme Agora sont réalisés en conformité avec le
      règlement européen n° 2016/679 général sur la protection des données du 27 avril 2016 dit « RGPD » et la loi n° 78-17 relative à
      l’informatique, aux fichiers et aux libertés dite « LIL ».<br/><br/>
      La DITP, et plus spécifiquement en son sein, le délégué interministériel à la transformation publique, est responsable de traitement
      des données dont le fondement est le e) du 1. de l’article 6 du RGPD : « <b>traitement nécessaire à l'exécution d'une mission
      d'intérêt public ou relevant de l'exercice de l'autorité publique dont est investi le responsable du traitement</b> ». La DITP réalise
      ces traitements dans le cadre de ses missions qui lui sont fixées par l’article 4 du décret n° 2015-1165 du 21 septembre 2015 : « la
      direction interministérielle de la transformation publique coordonne et anime les travaux d'amélioration de l'action des
      administrations au profit des usagers. A cet effet :<br/>
      1° Elle promeut les actions permettant de mieux prendre en compte les attentes des usagers, des agents et des partenaires de l'Etat,
      et d'améliorer et d'évaluer la qualité de service ; »
    </p>
    <h2>Quels sont les sous-traitants qui interviennent, sous la responsabilité du responsable de traitement, dans le traitement de ces
      données ?</h2>
    <p>
      Sous la direction du responsable de traitement, les sous-traitants suivants interviennent dans le traitement des données à caractère
      personnel :
      <ul>
        <li>
          La Direction interministérielle du numérique participe au développement de l’application Agora et au traitement des données dans
          les
          garanties de sécurité et de conformité aux normes en vigueur par l’intermédiaire de ses sous-traitants :
          <ul>
            <li>Scalingo pour l’infogérance et l’hébergement des données ; 
              <a href="https://scalingo.com/fr/data-processing-agreement"
                 target="_blank"
                 rel="external">https://scalingo.com/fr/data-processing-agreement</a> ;
               Scalingo s'appuie sur Outscale qui lui fournit une infrastructure IaaS certifiée SecNumCloud, plus haut niveau de sécurité conseillé par l'ANSSI ;
            </li>
            <li>Baleen, fournissant une infrastructure qui garantit la résilience, la sécurité et la performance de l’application en
              protégeant vos données contre toute cyberattaque : <a href="https://baleen.cloud/confidentialite"
                                                                    target="_blank"
                                                                    rel="external">https://baleen.cloud/confidentialite</a>
            </li>
          </ul>
        </li>
        <li>Le sous-traitant Netino assure la modération des Questions au Gouvernement avant leur publication sur l’application</li>
      </ul>
    </p>
    <h2>Quels droits avez-vous ?</h2>
    <p>
      L’Utilisateur peut supprimer ou modifier à tout moment dans son profil les données le concernant qu’il aurait remplies une première
      fois.<br/><br/>
      Plus largement, l’Utilisateur dispose d’un :
      <ul>
        <li>droit d’information et d’un droit d’accès à vos données ;</li>
        <li>droit de rectification, et le cas échéant de suppression des données ;</li>
        <li>droit d’opposition.</li>
      </ul>
      Pour les exercer, contactez-nous par voie électronique à : agora@beta.gouv.fr.
      <br/>
      Ou par voie postale : Direction interministérielle de la transformation publique - TSA 70732 - 75334 Paris Cedex 07
      <br/><br/>
      Puisque ce sont des droits personnels, nous ne traiterons votre demande que si nous sommes en mesure de vous identifier. Pour
      l’exercice de vos droits, veuillez vous munir du code suivant [User ID] (disponible dans “Votre Profil - Supprimer mon compte”).
      Nous nous engageons à vous répondre dans un délai raisonnable qui ne saurait dépasser 1 mois à compter de la réception de votre
      demande.
      <br/><br/>
      Si vous ne jugez pas suffisante la prise en compte de vos droits, vous pouvez contacter la CNIL : <a href="https://www.cnil.fr"
                                                                                                           target="_blank" rel="external">https://www.cnil.fr</a>
    </p>
    <h2>Qui a accès à ces données ?</h2>
    <p>
      Les données ne sont ni cédées, ni transmises ni divulguées à des tiers non autorisés.<br/>
      L’accès aux données est strictement encadré. Les personnes suivantes sont susceptibles d’avoir accès aux données :
      <ul>
        <li>
          Les membres de l’équipe d’Agora qui ont besoin des données dans leurs missions, notamment les modérateurs, les équipes
          techniques, les personnes chargées de l’analyse des données ;
        </li>
        <li>Les agents publics dans l’exercice de leurs fonctions, notamment les agents des administrations concernées par les
          consultations ;
        </li>
        <li>Les sous-traitants intervenant dans le processus de traitement de données, listés ci-dessous.</li>
      </ul>
      <br/>
      Dès que les durées de conservation des données à caractère personnel indiquées ci-dessus sont échues, elles sont détruites. Les seules
      données et informations alors conservées le sont à des fins statistiques et anonyme.
    </p>
    <h2>Quelles mesures de sécurité mettons-nous en place ?</h2>
    <p>
      Nous mettons en place plusieurs mesures pour sécuriser les données :
      <ul>
        <li>Stockage des données en base de données en France ;</li>
        <li>Cloisonnement des données (3 base de données distinctes) ;</li>
        <li>Surveillance technique et sécurisation de l’application (journaux de connexion) ;</li>
        <li>Protection contre les virus, malwares et logiciels espions ;</li>
        <li>Protection des réseaux ;</li>
        <li>Sauvegarde ;</li>
        <li>Mesures restrictives limitant l’accès physique aux données à caractère personnel.</li>
      </ul>
      Nous nous engageons conformément à la réglementation en vigueur, à mettre en œuvre toutes les mesures techniques et
      organisationnelles appropriées grâce à des moyens de sécurisation physiques et logistiques permettant de garantir un niveau de
      sécurité adapté au regard des risques d'accès accidentels, non autorisés ou illégaux, de divulgation, d'altération, de perte ou encore
      de destruction des données personnelles vous concernant.
    </p>
    <h2>Cookies</h2>
    <p>
      ➢ Rappel de ce qu’est un cookie en général :<br/>
      Un cookie est un fichier déposé sur votre terminal lors de la visite d’un site. Il a pour but de collecter des informations
      relatives à votre navigation et de vous adresser des services adaptés à votre terminal (ordinateur, mobile ou tablette)
      <br/><br/>
      En application de l’article 5(3) de la directive 2002/58/CE modifiée concernant le traitement des données à caractère personnel et
      la protection de la vie privée dans le secteur des communications électroniques, transposée à l’article 82 de la loi n°78-17 du 6
      janvier 1978 relative à l’informatique, aux fichiers et aux libertés, les traceurs ou cookies suivent deux régimes distincts :
      <ul>
        <li>Les cookies strictement nécessaires au service ou ayant pour finalité exclusive de faciliter la communication par voie
          électronique sont dispensés de consentement préalable au titre de l’article 82 de la LIL.
        </li>
        <li>Les cookies n’étant pas strictement nécessaires au service ou n’ayant pas pour finalité exclusive de faciliter la
          communication par voie électronique doivent être consentis par l’utilisateur. Ce consentement de la personne concernée pour une ou
          plusieurs finalités spécifiques constitue une base légale au sens du RGPD et doit être entendu au sens de l’article 6-a du RGPD.
        </li>
      </ul>
      <br/>
      ➢ Les Cookies recensés sur Agora :<br/>
      Les seuls cookies utilisés sur Agora sont les cookies de mesure d’audience de la solution MATOMO dans sa version exemptée de
      consentement préalable, telle que validée par la CNIL
      (<a href="https://www.cnil.fr/sites/default/files/atoms/files/matomo_analytics_-_exemption_-_guide_de_configuration.pdf"
          target="_blank" rel="external">https://www.cnil.fr/sites/default/files/atoms/files/matomo_analytics_-_exemption_-_guide_de_configuration.pdf</a>).
    </p>
  </div>
</template>
