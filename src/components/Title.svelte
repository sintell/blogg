<script>
  export let pageTitle = false;
</script>

{#if pageTitle}
  <h1 class="section-page-title">
    <a href="/" class="link">antky.dev/</a>
    <slot />
  </h1>
{:else}
  <h2>
    <slot />
  </h2>
{/if}

<style>
  h1,
  h2 {
    margin-top: 20px;
  }
  h1:first-child {
    margin-bottom: 40px;
  }

  .section-page-title {
    left: -74px;
    position: relative;
  }
  .section-page-title > .link {
    font-size: 14px;
  }

  @media (min-width: 320px) and (max-width: 1024px) {
    .section-page-title {
      left: 0;
    }
  }
</style>
