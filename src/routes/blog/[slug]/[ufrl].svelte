<script context="module">
  export async function preload({ host, params: { ufrl, slug } }) {
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
  import Text from '../../../components/Text.svelte';
  import Title from '../../../components/Title.svelte';
  import Code from '../../../components/Code.svelte';
  import Image from '../../../components/Image.svelte';
  import List from '../../../components/List.svelte';
  import Quote from '../../../components/Quote.svelte';
  import Callout from '../../../components/Callout.svelte';
  import Video from '../../../components/Video.svelte';
  import {
    CALLOUT,
    CODE,
    IMAGE,
    LIST,
    PAGE,
    QUOTE,
    TEXT,
    VIDEO,
  } from '../../../components/sections';

  export let sections = [],
    meta = {};
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.desc} />
  <meta http-equiv="content-language" content={meta.lang} />
</svelte:head>

{#each sections as section}
  <Title pageTitle={section.type === PAGE} textSections={section.title} />
  {#each section.children as subsection}
    {#if subsection.type === IMAGE}
      <Image {...subsection} />
    {:else if subsection.type == TEXT}
      <Text textSections={subsection.value} wrap />
    {:else if subsection.type == QUOTE}
      <Quote textSections={subsection.value} />
    {:else if subsection.type == CALLOUT}
      <Callout textSections={subsection.value} />
    {:else if subsection.type === LIST}
      <List items={subsection.children} />
    {:else if subsection.type === CODE}
      <Code language={subsection.language}>{subsection.value}</Code>
    {:else if subsection.type === VIDEO}
      <Video src={subsection.src} caption={subsection.caption} />
    {/if}
  {/each}
{/each}

<style>

</style>
