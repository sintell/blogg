<script>
  import InnerText from './InnerText.svelte';
  export let textSections = [];
  export let wrap = false;
</script>

{#if wrap}
  <p class="whitespace-pre-wrap">
    <InnerText {textSections} />
  </p>
{:else}
  <InnerText {textSections} />
{/if}
