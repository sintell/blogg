<script>
  import Text from './Text.svelte';
  export let textSections = [];
</script>

{#if textSections.length > 0}
  <p class="mx-auto my-0 text-sm px-5 py-2 font-sans text-gray-600 bg-gray-200">
    <Text {textSections} />
  </p>
{/if}
