<script>
  import Caption from './Caption.svelte';
  export let src = '';
  export let alt = 'image';
  export let caption = '';
</script>

<div class="section-img">
  <img {src} {alt} />
  <Caption textSections={caption} />
</div>

<style>
  img {
    max-width: 600px;
    margin: auto;
    display: block;
  }
  .section-img {
    margin: 0 auto;
    max-width: 600px;
  }

  @media (min-width: 320px) and (max-width: 600px) {
    img,
    .section-img {
      max-width: 100%;
    }
  }
</style>
