<script>
  import Text from './Text.svelte';
  export let textSections = [];
</script>

{#if textSections.length > 0}
  <p class="caption">
    <Text {textSections} />
  </p>
{/if}

<style>
  .caption {
    margin: 0 auto;
    font-size: 14px;
    color: #666;
    background-color: #eee;
    padding: 2px 6px;
    white-space: pre-wrap;
  }
</style>
