<script>
  import Text from './Text.svelte';
  export let pageTitle = false;
  export let textSections = [];
</script>

{#if pageTitle}
  <h1 class="text-2xl md:text-4xl font-bold mb-10">
    <a href="/" class="text-base font-normal block md:inline-block md:-ml-20">
      antky.dev/
    </a>
    <Text {textSections} />
  </h1>
{:else}
  <h2 class="text-xl md:text-2xl font-bold mt-10 mb-5">
    <Text {textSections} />
  </h2>
{/if}
