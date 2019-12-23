<script context="module">
  export async function preload({ host, params: { slug } }) {
    let baseUrl = '';
    if (!process.browser && process.env.NOW_REGION) {
      baseUrl = `https://${host}`;
    }
    const res = await this.fetch(`${baseUrl}/blog/${slug}.json`);
    const { notionData, etag } = await res.json();
    return { ...notionData, etag };
  }
</script>

<script>
  import Prism from 'prismjs';
  export let sections = [],
    meta = {};

  function renderText(title) {
    return title.map(chunk => {
      return title;
    });
  }

  function processText(textSection) {
    const [text, opts] = textSection;
    if (opts) {
      const [code, args] = opts[0];
      return [{ text, code, args }];
    }

    return [{ text, code: null, args: null }];
  }
</script>

<svelte:head>
  <title>{meta.title}</title>
</svelte:head>

{#each sections as section}
  {#if section.type === 'page'}
    <h1 class="section-page-title">
      <a href="/" class="link">antky.dev/</a>
      {section.title}
    </h1>
  {:else}
    <h1>{section.title}</h1>
  {/if}
  {#each section.children as subsection}
    {#if subsection.type === 'image'}
      <span>
        <img src={subsection.src} alt={subsection.alt} />
      </span>
    {:else if ['text', 'quote', 'callout'].includes(subsection.type)}
      <p class={`section-${subsection.type}`}>
        {#each subsection.value as textSection}
          {#each processText(textSection) as { text, code, args }}
            {#if code == 'c'}
              <code class="inline">{text}</code>
            {:else if code == 'a'}
              <a href={args}>{text}</a>
            {:else}{text}{/if}
          {/each}
        {/each}
      </p>
    {:else if subsection.type === 'list'}
      <ul>
        {#each subsection.children as listItem}
          <li>{renderText(listItem)}</li>
        {/each}
      </ul>
    {:else if subsection.type === 'code'}
      <pre class="language-bash">
        <code class="language-bash">
          {@html Prism.highlight(subsection.value[0][0], Prism.languages.bash, subsection.language[0][0])}
        </code>
      </pre>
    {/if}
  {/each}
{/each}

<style>
  img {
    max-width: 600px;
    margin: auto;
    display: block;
  }
  p,
  h1,
  h2,
  h3 {
    padding: 0 120px 0 120px;
  }
  ul {
    padding: 0 120px 0 160px;
  }

  h1 {
    margin-top: 40px;
  }

  .highlight {
    color: red;
  }

  .section-quote {
    background-color: #eee;
    padding: 20px 120px 20px 120px;
  }

  .section-page-title {
    padding-left: 46px;
  }
  .section-page-title > .link {
    font-size: 14px;
  }

  .section-callout {
    background-color: #ffe6d7;
    padding-top: 20px;
    padding-bottom: 20px;
    box-shadow: inset 0 0 3px #655a54;
  }

  code.inline {
    background: #ffc0cb;
    color: #860000;
  }

  code[class*='language-'],
  pre[class*='language-'] {
    color: #f8f8f2;
    text-shadow: none;
    font-size: 14px;
  }

  pre[class*='language-'] {
    border-radius: 0;
    width: 1000px;
    margin: auto;
  }
</style>
