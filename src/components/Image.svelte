<script>
  import Caption from './Caption.svelte';
  export let src = '';
  export let alt = 'image';
  export let caption = '';
</script>

<div class="max-w-full lg:max-w-2xl m-auto block">
  <img {src} {alt} />
  <Caption textSections={caption} />
</div>
