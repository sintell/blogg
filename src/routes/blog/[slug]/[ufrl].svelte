<script context="module">
  export async function preload({ host, params: { ufrl, slug } }) {
    let baseUrl = '';
    if (!process.browser && process.env.NOW_REGION) {
      baseUrl = `https://${host}`;
    }
    const res = await this.fetch(`${baseUrl}/blog/${slug}.json`);
    const { notionData, etag } = await res.json();
    return { ...notionData, etag };
  }
</script>

<script>
  import NotionPage from '../../../components/NotionPage.svelte';
  let sections = [];
  let meta = {};

  export { sections, meta };

  let imagesCount = 0;
  const hasAPI =
    typeof window !== 'undefined' && 'IntersectionObserver' in window;
</script>

<NotionPage {sections} {meta} />
