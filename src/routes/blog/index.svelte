<script context="module">
  export async function preload(page, session) {
    const { slug } = page.params;

    const res = await this.fetch('/blog.json');
    const { notionData, etag } = await res.json();
    console.log('notion data', notionData, etag);
    return { ...notionData, etag };
  }
</script>

<script>
  export let sections = [],
    meta = {};

  function renderText(title) {
    return title.map(chunk => {
      return title;
    });
  }
</script>

<style>
  img {
    max-width: 400px;
  }
</style>

<svelte:head>
  <title>{meta.title}</title>
</svelte:head>

{#each sections as section}
  <h1>{section.title}</h1>
  {#each section.children as subsection}
    {#if subsection.type === 'image'}
      <span>
        <img src={subsection.src} alt={subsection.alt} />
      </span>
    {:else if subsection.type === 'text'}
      <p>{renderText(subsection.value)}</p>
    {:else if subsection.type === 'list'}
      <ul>
        {#each subsection.children as listItem}
          <li>{renderText(listItem)}</li>
        {/each}
      </ul>
    {/if}
  {/each}
{/each}
