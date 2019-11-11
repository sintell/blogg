<script>
  const date = new Date()
  let hello = ''

  if (date.getHours() > 8 && date.getHours() < 18) {
    hello = 'Have a good day!'
  } else {
    hello = 'Have a good night!'
  }
</script>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  p {
    text-align: center;
    margin: 0 auto;
    margin: 1em auto;
  }

  .nickname {
    font-size: 4em;
    background-color: #423;
    color: white;
    padding: 0px 40px 10px;
    margin: 0;
  }
  .name {
    color: #aaa;
    font-size: 1.1em;
  }
</style>

<svelte:head>
  <title>antky</title>
</svelte:head>

<div class="container">
  <div>
    <p class="nickname">antky</p>
    <p class="name">Aleksei Anatskii</p>
    <p class="greeting">{hello}</p>
  </div>
</div>
