<script>
  import InnerText from './InnerText.svelte';
  export let textSections = [];
  export let wrap = false;
</script>

{#if wrap}
  <p class="section-text">
    <InnerText {textSections} />
  </p>
{:else}
  <InnerText {textSections} />
{/if}

<style>
  .section-text {
    white-space: pre-wrap;
  }
</style>
