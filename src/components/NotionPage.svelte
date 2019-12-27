<script>
  import Text from './Text.svelte';
  import Title from './Title.svelte';
  import Code from './Code.svelte';
  import Image from './Image.svelte';
  import List from './List.svelte';
  import Quote from './Quote.svelte';
  import Callout from './Callout.svelte';
  import Video from './Video.svelte';
  import {
    CALLOUT,
    CODE,
    IMAGE,
    LIST,
    PAGE,
    QUOTE,
    TEXT,
    VIDEO,
  } from './sections';

  let sections = [];
  let meta = {};

  export { sections, meta };
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
      <Image {...{ ...subsection, lazy: false }} />
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
