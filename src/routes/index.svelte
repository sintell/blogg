<script context="module">
  export async function preload({ host, params }) {
    let baseUrl = '';
    if (!process.browser && process.env.NOW_REGION) {
      baseUrl = `https://${host}`;
    }

    const res = await this.fetch(`${baseUrl}/blog.json`);
    const { notionData, etag } = await res.json();
    return { ...notionData, etag };
  }
</script>

<script>
  import GlitchBlock from '../components/GlichBlock.svelte';
  export let sections = [];
</script>

<svelte:head>
  <title>antky</title>
</svelte:head>

<div class="container">
  <div>
    <GlitchBlock nickname="antky" />
    <p class="name">Aleksei Anatskii</p>
    <p>
      {#each sections as section}
        {#if section.type === 'page'}
          <p>
            <a href={`/blog/${section.link}`} rel="prefetch">{section.title}</a>
          </p>
        {/if}
      {/each}
    </p>
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  p {
    text-align: center;
    margin: 0 auto;
    margin: 1em auto;
  }

  .name {
    color: #aaa;
    font-size: 1.1em;
  }
</style>
