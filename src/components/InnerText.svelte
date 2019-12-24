<script>
  export let textSections = [];

  function processText(textSection) {
    const [text, opts] = textSection;
    if (opts) {
      const [code, args] = opts[0];
      return [{ text, code, args }];
    }

    return [{ text, code: null, args: null }];
  }
</script>

{#each textSections as textSection}
  {#each processText(textSection) as { text, code, args }}
    {#if code == 'c'}
      <code class="inline">{text}</code>
    {:else if code == 'a'}
      <a href={args}>{text}</a>
    {:else}{text}{/if}
  {/each}
{/each}

<style>
  code.inline {
    background: #ffc0cb;
    color: #860000;
  }
</style>
