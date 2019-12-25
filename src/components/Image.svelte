<script>
  import Caption from './Caption.svelte';
  export let src = '';
  export let alt = 'image';
  export let caption = '';
</script>

<div class="m-auto block">
  <img {src} {alt} />
  <Caption textSections={caption} />
</div>
