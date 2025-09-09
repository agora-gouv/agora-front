<template>
  <div class="fr-mt-4w">
    <div class="consultation">
      <div id="right-column">
        <ul class="badges">
          <li><Skeleton class="fr-badge fr-badge--no-icon" characterCount="21" lineCount="1"/></li>
          <li><Skeleton class="fr-badge fr-badge--no-icon" characterCount="21" lineCount="1" /></li>
        </ul>
        <div>
          <Skeleton class="fr-tag" characterCount="10" lineCount="1" />
        </div>
        <h1><Skeleton characterCount="50" lineCount="1" /></h1>
        <ConsultationEnUnClinDOeilSkeleton />
        <ConsultationQuestionsInformationsSkeleton class="info-question fr-py-1w" />
        <ConsultationSectionsSkeleton />
        <DsfrButton type="button" class="fr-mb-4w fr-btn">
          <Skeleton characterCount="26" lineCount="1" />
        </DsfrButton>
      </div>

      <div id="left-column">
        <div class="fr-responsive-img"><Skeleton fullWidth aspectRatio="16/9" /></div>
        <div class="history">
          <h2><Skeleton characterCount="24" lineCount="1" /></h2>
          <ul>
            <li class="fr-grid-row" aria-current="true">
              <div class="fr-col-1">
                <Skeleton class="iconify" lineCount="1" aspectRatio="1" />
              </div>
              <div class="fr-col-11">
                <div class="fr-ml-3w">
                  <div><Skeleton characterCount="15" lineCount="1" /></div>
                  <div><Skeleton characterCount="15" lineCount="1" /></div>
                </div>
              </div>
            </li>
            <li class="fr-grid-row">
              <div class="fr-col-1">
                <Skeleton class="iconify" lineCount="1" aspectRatio="1" />
              </div>
              <div class="fr-col-11">
                <div class="fr-ml-3w">
                  <div><Skeleton characterCount="15" lineCount="1" /></div>
                  <div><Skeleton characterCount="15" lineCount="1" /></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <ConsultationEnUnClinDOeilSkeleton />
      </div>
    </div>
    <BandeauTelechargementAdaptatif title="C’est encore mieux sur l’application Agora."/>
  </div>
</template>

<style lang="scss">
@use './ConsultationContentLayout.module';

.consultation > * {
  min-width: 0;
}

</style>
<script setup lang="ts">
</script>
