<script>
  import Prism from 'prismjs';
  import { tick } from 'svelte';

  export let language = 'clike';

  let element, formattedCode;

  // $$$ are used intentionally, to make markup preprocessor work, I'll take care of this later
  $: $$$props && element && highlightCode();

  async function highlightCode() {
    await tick();
    const grammar = Prism.languages[language.toLowerCase()];
    let body = element.textContent;
    formattedCode = Prism.highlight(body, grammar, language);
  }
  function attachElement(e) {
    element = e;
  }
</script>

<code style="display:none" use:attachElement>
  <slot />
</code>

<pre class="language-{language}">
  <code class="language-{language}">
    {@html formattedCode}
  </code>
</pre>

<style>
  code[class*='language-'],
  pre[class*='language-'] {
    color: #f8f8f2;
    text-shadow: none;
    font-size: 14px;
  }

  pre[class*='language-'] {
    border-radius: 0;
    max-width: 1000px;
    margin: auto;
  }

  @media (min-width: 320px) and (max-width: 10024px) {
    pre[class*='language-'] {
      max-width: 100%;
    }
  }
</style>
