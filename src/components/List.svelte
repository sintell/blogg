<script>
  import Text from './Text.svelte';
  export let items = [];
</script>

<ul>
  {#each items as listItem}
    <li>
      <Text textSections={listItem} />
    </li>
  {/each}
</ul>

<style>

</style>
