<script>
  import Link from './Link.svelte';
  export let textSections = [];
  const knownCodes = ['c', 'a', 'i', 'h', 'b', 's'];
  function processText(textSection) {
    const [text, opts] = textSection;
    if (opts && opts.length > 0) {
      const [code, args] = opts[0];
      if (!knownCodes.includes(code)) {
        console.warn('UNKNOWN CODE:', code, args, text);
      }
      if (opts && opts.length > 1) {
        return [
          {
            text: null,
            code,
            args,
            rest: [[text, opts.slice(1, opts.length)]],
          },
        ];
      }
      return [{ text, code, args, rest: [[text]] }];
    }

    return [{ text, code: null, args: null, rest: null }];
  }

  function highlight(color) {
    if (color.endsWith('background')) {
      return `py-1 bg-${color.split('_')[0]}-400`;
    }

    return `text-${color}-400`;
  }
</script>

{#each textSections as textSection}
  {#each processText(textSection) as { text, code, args, rest }}
    {#if code == 'c'}
      <code class="bg-pink-300 text-red-800 text-sm">
        <svelte:self textSections={rest} />
      </code>
    {:else if code == 'a'}
      <Link href={args}>
        <svelte:self textSections={rest} />
      </Link>
    {:else if code == 'i'}
      <i>
        <svelte:self textSections={rest} />
      </i>
    {:else if code == 'h'}
      <span class={highlight(args)}>
        <svelte:self textSections={rest} />
      </span>
    {:else if code == 'b'}
      <b>
        <svelte:self textSections={rest} />
      </b>
    {:else if code == 's'}
      <s>
        <svelte:self textSections={rest} />
      </s>
    {:else if rest === null}{text}{/if}
  {/each}
{/each}
