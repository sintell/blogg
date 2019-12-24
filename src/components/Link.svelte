<script>
  import { stores } from '@sapper/app';
  import { onMount } from 'svelte';
  const { page } = stores();
  export let href = '/';
  let currentHost = null;
  let external = false;
  $: external =
    href.startsWith('http') && !href.startsWith(`https://${currentHost}`);
  onMount(() => {
    currentHost = document.location.hostname;
  });
</script>

<a class:external {href} target={external ? '_blank' : '_self'}>
  <slot />
</a>

<style>
  .external::after {
    content: '🔗';
    font-size: 10px;
    position: absolute;
    background: rgba(100, 100, 100, 0.2);
    padding: 1px;
    border-radius: 3px;
    margin-top: -5px;
    transition: all 0.5s ease-in-out;
  }

  .external:hover::after {
    background: white;
    transition: all 0.5s ease-in-out;
    font-size: 14px;
  }
</style>
