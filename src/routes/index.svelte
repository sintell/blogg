<script context="module">
  export async function preload({ host, params }) {
    let baseUrl = '';
    if (!process.browser && process.env.NOW_REGION) {
      baseUrl = `https://${host}`;
    }

    const res = await this.fetch(`${baseUrl}/blog.json`);
    const {
      notionData: { sections, meta },
    } = await res.json();
    return { sections, meta };
  }
</script>

<script>
  import GlitchBlock from '../components/GlichBlock.svelte';
  let sections = [];
  let meta = {};
  export { sections, meta };
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.meta_description} />
  <meta name="theme-color" content="#{meta.meta_color}" />
</svelte:head>

<GlitchBlock nickname="antky" />
<p class="text-center font-sans text-gray-400">Aleksei Anatskii</p>
<h2>Check my latest blog posts:</h2>
<ul>
  {#each sections as section}
    <li class="font-sans text-lg">
      <a
        href={`/blog/${section.link}/${section.title.replace(/\s/g, '-')}`}
        rel="prefetch">
        {section.title}
      </a>
    </li>
  {/each}
</ul>
