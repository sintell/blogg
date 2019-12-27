<script context="module">
  export async function preload({ host, params: { lang } }) {
    let baseUrl = '';
    if (!process.browser && process.env.NOW_REGION) {
      baseUrl = `https://${host}`;
    }
    const res = await this.fetch(`${baseUrl}/about/${lang}.json`);
    const { notionData, etag } = await res.json();
    return { ...notionData, etag };
  }
</script>

<script>
  import NotionPage from '../../components/NotionPage.svelte';
  let sections = [];
  let meta = {};

  export { sections, meta };
</script>

<NotionPage {sections} {meta} />
