<script>
  import Caption from './Caption.svelte';
  export let src = '';
  export let caption = '';
</script>

<div class="section-video">
  <video {src} controls muted preload="auto">Loading...</video>
  <Caption textSections={caption} />
</div>

<style>
  video {
    max-width: 600px;
  }
  .section-video {
    margin: 0 auto;
    max-width: 600px;
  }

  @media (min-width: 320px) and (max-width: 600px) {
    video,
    .section-video {
      max-width: 100%;
    }
  }
</style>
