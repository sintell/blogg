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
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABo0lEQVR4Xu3ZUa/CIAwFYPbL1V+uIZFkMRs97rSUjt6X+8KA863YObey+N+2eP6SAFkBiwvkEVi8APJDEDkCb7JKpDWepZQHuUbv8u760ubqxNYAdQ1LhBAAlghhAKwQQgFYIIQD0EYICaCJEBZAC8EcAGmlV9u8RnsMC6ARvsKHBNAKHxJAM3w4AO3woQAswocBsAofAsAy/PQAbPjX9wGj9z5h2jaoEb7OIT0xTgmgGb49ZZ7NOR2ARfgewlQAluHPEKYBGBH+CGEKgJHhfxHcATzC7xFapzj8So58l5dei0tzMAC1z3cDXH3R0K6TNo/8LoDMcQXBPLz4mPhVYitA6tNHN3FI+NEA0hNbgxgW3gNAQhga3gvgDGF4eE+AXwSX8N4ADWH/n+1qf1+PtDCtLvD35sALqP0lAKBMCQPzs0Oo/WUFAPyUMDA/O4TaX1YAwE8JA/OzQ6j9ZQUA/JIwMIXrEPM3Qq7pgMUToIek8RkA3ATXIVkBWQEdgTwCwOlcvg0CRnGHIEcgbjpg5wkAIN16SFbArW8vEC4rAEC69ZAP7b9uQS1lOqIAAAAASUVORK5CYII=');
    background-size: 8px 8px;
    height: 8px;
    width: 8px;
    content: '';
    position: absolute;
    padding: 1px;
  }
</style>
