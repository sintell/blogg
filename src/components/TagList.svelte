<script>
  import Tag from './Tag.svelte';
  let items = [];
  export { items };
</script>

<div class="mt-1 mb-5">
  {#each items as tag}
    <Tag>{tag}</Tag>
  {/each}
</div>
