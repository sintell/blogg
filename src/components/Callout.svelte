<script>
  import Text from './Text.svelte';
  export let textSections = [];
</script>

<p class="section-callout">
  <Text {textSections} />
</p>

<style>
  .section-callout {
    white-space: pre-wrap;
    background-color: #ffe6d7;
    padding: 20px 40px;
    box-shadow: inset 0 0 3px #655a54;

    position: relative;
    left: -50%;
    padding-left: 50%;
    padding-right: 50%;
    width: 100%;
  }
</style>
