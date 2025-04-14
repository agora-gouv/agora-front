<script setup lang="ts">
import { ConsultationUpdate } from '~/client/types/consultation/consultation';

defineProps<{
  history: ConsultationUpdate[],
  consultationSlug: string,
  currentUpdateId: string
}>()

</script>

<template>
  <div class="history">
    <div class="history-item" v-for="update in history">
      <ConsultationHistoryUpdate 
        :update="update" 
        :consultation-slug="consultationSlug" 
        :current-update-id="currentUpdateId"/>
    </div>
  </div>
</template>
<style scoped>
.history {
  display: flex;

  .history-item {
    position: relative;

    .icon {
      display: block;
      position: relative;
      border-radius: 50%;
      background-color: white;
      border: 3px solid var(--text-label-blue-france);
      width: 2.5em;
      height: 2.5em;
      padding: 10px;
    }

    .content {
      padding: 10px;
      background-color: var(--background-open-blue-france-hover);
      color: var(--text-action-high-grey);

      border-radius: 10px;
    }
  }
}

@media screen and ( min-width: 64em) {
  .history {
    flex-direction: row-reverse;

    .history-item {
      width: 80%;
      justify-content: space-around;

      &:not(:first-child) .step::after {
        display: block;
        content: "";
        position: absolute;
        background: var(--background-open-blue-france-hover);
        z-index: -1;
        top: 1.5em;
        height: 3px;
        width: 100%;
      }

      .content {
        max-width: 70%;
        margin-top: 1em;
      }
    }

  }

}

@media screen and ( max-width: 64em) {
  .history {
    flex-direction: column;

    .history-item {
      min-height: 10em;

      .icon {
        top: 2.5em;
      }

      &:not(:last-child) .step::after {
        display: block;
        content: "";
        position: absolute;
        background: var(--background-open-blue-france-hover);
        z-index: -1;
        top: 50%;
        left: 1.4em;
        width: 3px;
        height: 96%;
      }

      .content {
        max-height: 70%;
        margin-left: 5em;
        max-width: 50vw;
      }

    }
  }
}
</style>