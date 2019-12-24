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
</script>

{#each textSections as textSection}
  {#each processText(textSection) as { text, code, args, rest }}
    {#if code == 'c'}
      <code class="inline">
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
      <span class="highlight-{args}">
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

<style>
  .inline {
    background: #ffc0cb;
    color: #860000;
  }
  .highlight-gray {
    color: gray;
  }
  .highlight-brown {
    color: brown;
  }
  .highlight-orange {
    color: orange;
  }
  .highlight-yellow {
    color: #a79c02;
  }
  .highlight-teal {
    color: teal;
  }
  .highlight-blue {
    color: blue;
  }
  .highlight-purple {
    color: purple;
  }
  .highlight-pink {
    color: pink;
  }
  .highlight-red {
    color: red;
  }
  .highlight-gray_background {
    background-color: gray;
    color: white;
  }
  .highlight-brown_background {
    background-color: brown;
    color: white;
  }
  .highlight-orange_background {
    background-color: orange;
    color: white;
  }
  .highlight-yellow_background {
    background-color: #a79c02;
    color: white;
  }
  .highlight-teal_background {
    background-color: teal;
    color: white;
  }
  .highlight-blue_background {
    background-color: blue;
    color: white;
  }
  .highlight-purple_background {
    background-color: purple;
    color: white;
  }
  .highlight-pink_background {
    background-color: pink;
    color: white;
  }
  .highlight-red_background {
    background-color: red;
    color: white;
  }
</style>
