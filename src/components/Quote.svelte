<script>
  import Text from './Text.svelte';
  export let textSections = [];
</script>

<p class="section-quote">
  <Text {textSections} />
</p>

<style>
  .section-quote {
    white-space: pre-wrap;
    background-color: #eee;
    padding: 20px 40px;
    box-shadow: inset 0 0 3px #655a54;

    position: relative;
    left: -50%;
    padding-left: 50%;
    padding-right: 50%;
    width: 100%;
  }
</style>
