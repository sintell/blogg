<script>
  import Text from './Text.svelte';
  export let items = [];
</script>

<ul class="list-outside list-disc pl-5 md:pl-10">
  {#each items as listItem}
    <li class="mt-3">
      <Text textSections={listItem.title} />
    </li>
  {/each}
</ul>
