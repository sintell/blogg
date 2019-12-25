<script>
  import Text from './Text.svelte';
  export let pageTitle = false;
  export let textSections = [];
</script>

{#if pageTitle}
  <h1
    class="-mx-20 border-b-2 border-pink-400 p-20 pb-6 pt-5 shadow-lg
    md:text-4xl">
    <a href="/" class="text-base font-normal block" rel="prefetch">
      antky.dev/
    </a>
    <Text {textSections} />
  </h1>
{:else}
  <h2 class="md:text-2xl font-bold mt-10 mb-5">
    <Text {textSections} />
  </h2>
{/if}
