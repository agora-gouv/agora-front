<script setup lang="ts">
const {id = useId()} = defineProps<{
  id?: string,
  value: number,
}>()
</script>

<template>
  <div class="question-result" :style="`--value: '${value}';`">
    <!-- FIXME (GAFI 10-07-2025): Passer sur <meter> -->
    <progress :id="id" :value="value" max="100" v-bind="$attrs">{{ value }} %</progress>
    <label :for="id">
      <slot name="label"></slot>
    </label>
  </div>
</template>

<style lang="scss">
.question-result {
  display: grid;
  grid-template-columns: minmax(5ch, auto) 1fr;
  margin-bottom: 8px;
  padding: 8px;
  gap: 1ch;
  &::before {
    content: var(--value) " %";
    @supports (content: var(--value) " %" / "") { content: var(--value) " %" / ""; }
  }
  
  position: relative;
  progress {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
  
  progress {
    border-radius: 5px;
    overflow: hidden;
    background-color: white;
    border: 1px solid #bbbbbb;
  }

  progress::-webkit-progress-bar {
    background-color: white;
  }

  progress::-webkit-progress-value {
    background-color: #ECECFE;
  }

  progress::-moz-progress-bar {
    background-color: #ECECFE;
  }

  &::before {
    font-weight: bold;
    align-content: center;
  }
  label {
    color: #161616;
    font-size: 14px;
  }
}
</style>