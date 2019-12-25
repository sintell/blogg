<script>
  import Text from './Text.svelte';
  export let textSections = [];
</script>

<div
  class="-mx-5 pl-5 md:-mx-32 md:pl-32 lg:-mx-56 lg:pl-56 bg-gray-200 border-b-4
  border-gray-400">
  <p class="w-5/6 md:w-full py-4 m-0 text-lg md:text-base">
    <Text {textSections} />
  </p>
</div>
