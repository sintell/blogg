<script context="module">
  export async function preload({ host, params }) {
    let baseUrl = '';
    if (!process.browser && process.env.NOW_REGION) {
      baseUrl = `https://${host}`;
    }

    const res = await this.fetch(`${baseUrl}/blog.json`);
    const { notionData, etag } = await res.json();
    return { ...notionData, etag };
  }
</script>

<script>
  export let sections = [];
</script>

<svelte:head>
  <title>antky</title>
</svelte:head>

<div class="container">
  <div>
    <p class="nickname glitch" data-text="antky">antky</p>
    <p class="name">Aleksei Anatskii</p>
    <p>
      {#each sections as section}
        {#if section.type === 'page'}
          <p>
            <a href={`/blog/${section.link}`} rel="prefetch">{section.title}</a>
          </p>
        {/if}
      {/each}
    </p>
  </div>
</div>

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

  .glitch {
    color: white;
    font-family: sans-serif;
    font-weight: 800;
    position: relative;
    font-size: 100px;
  }
  .glitch::before,
  .glitch::after {
    color: white;
    content: attr(data-text);
    position: absolute;
    width: 100%;
    height: 100%;
    background: #423;
    overflow: hidden;
    top: 0;
  }
  .glitch::before {
    left: -3px;
    text-shadow: -2px 0 red;
    animation-name: glitch-animation-1;
    animation-duration: 5s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: reverse-alternate;
  }
  .glitch::after {
    left: -4px;
    text-shadow: -2px 0 blue;
    animation-name: glitch-animation-2;
    animation-duration: 5s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: reverse-alternate;
  }

  @keyframes glitch-animation-1 {
    0% {
      clip: rect(87px, 350px, 73px, 30px);
    }
    0.5% {
      clip: rect(23px, 350px, 6px, 30px);
    }
    1% {
      clip: rect(2px, 350px, 67px, 30px);
    }
    1.5% {
      clip: rect(61px, 350px, 40px, 30px);
    }
    2% {
      clip: rect(79px, 350px, 44px, 30px);
    }
    2.5% {
      clip: rect(124px, 350px, 15px, 30px);
    }
    3% {
      clip: rect(99px, 350px, 18px, 30px);
    }
    3.5% {
      clip: rect(149px, 350px, 150px, 30px);
    }
    4% {
      clip: rect(57px, 350px, 14px, 30px);
    }
    4.5% {
      clip: rect(134px, 350px, 118px, 30px);
    }
    5% {
      clip: rect(94px, 350px, 88px, 30px);
    }
    5.5% {
      clip: rect(107px, 350px, 79px, 30px);
    }
    6% {
      clip: rect(100px, 350px, 122px, 30px);
    }
    6.5% {
      clip: rect(78px, 350px, 101px, 30px);
    }
    7% {
      clip: rect(60px, 350px, 94px, 30px);
    }
    7.5% {
      clip: rect(72px, 350px, 83px, 30px);
    }
    8% {
      clip: rect(75px, 350px, 143px, 30px);
    }
    8.5% {
      clip: rect(112px, 350px, 13px, 30px);
    }
    9% {
      clip: rect(91px, 350px, 49px, 30px);
    }
    9.5% {
      clip: rect(75px, 350px, 91px, 30px);
    }
    10% {
      clip: rect(19px, 350px, 107px, 30px);
    }
    11% {
      clip: rect(100px, 350px, 25px, 30px);
    }
    100% {
      clip: rect(100px, 350px, 25px, 30px);
    }
  }
  @keyframes glitch-animation-2 {
    0% {
      clip: rect(139px, 350px, 78px, 30px);
    }
    0.46% {
      clip: rect(128px, 350px, 60px, 30px);
    }
    0.92% {
      clip: rect(70px, 350px, 4px, 30px);
    }
    1.38% {
      clip: rect(113px, 350px, 44px, 30px);
    }
    1.84% {
      clip: rect(10px, 350px, 100px, 30px);
    }
    2.3% {
      clip: rect(77px, 350px, 16px, 30px);
    }
    2.76% {
      clip: rect(105px, 350px, 29px, 30px);
    }
    3.22% {
      clip: rect(117px, 350px, 143px, 30px);
    }
    3.68% {
      clip: rect(40px, 350px, 140px, 30px);
    }
    4.14% {
      clip: rect(71px, 350px, 133px, 30px);
    }
    4.6% {
      clip: rect(1px, 350px, 51px, 30px);
    }
    5.06% {
      clip: rect(129px, 350px, 16px, 30px);
    }
    5.52% {
      clip: rect(127px, 350px, 40px, 30px);
    }
    5.98% {
      clip: rect(75px, 350px, 83px, 30px);
    }
    6.44% {
      clip: rect(97px, 350px, 16px, 30px);
    }
    6.9% {
      clip: rect(59px, 350px, 6px, 30px);
    }
    7.36% {
      clip: rect(44px, 350px, 28px, 30px);
    }
    7.82% {
      clip: rect(89px, 350px, 38px, 30px);
    }
    8.28% {
      clip: rect(54px, 350px, 74px, 30px);
    }
    8.74% {
      clip: rect(8px, 350px, 43px, 30px);
    }
    9.2% {
      clip: rect(111px, 350px, 13px, 30px);
    }
    11% {
      clip: rect(100px, 350px, 25px, 30px);
    }
    100% {
      clip: rect(100px, 350px, 25px, 30px);
    }
  }
</style>
