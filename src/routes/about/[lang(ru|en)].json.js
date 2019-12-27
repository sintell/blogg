import { getNotionPageContent } from '../../data/notion';

const ABOUT_RU_PAEGE_ID = '10d7e394-666e-4c1d-9617-0465114ff7b5';
const ABOUT_EN_PAGE_ID = '457419ef-2f00-4e99-b761-5c3c827688e0';

// [lang([ruen]{2})].json
export async function get(req, res, next) {
  const pageId =
    req.params.lang === 'ru' ? ABOUT_RU_PAEGE_ID : ABOUT_EN_PAGE_ID;
  console.log('about', pageId, req.params.lang);
  try {
    const data = await getNotionPageContent(pageId);
    if (data) {
      const etag = require('crypto')
        .createHash('md5')
        .update(JSON.stringify(data))
        .digest('hex');

      res.setHeader(
        'Cache-Control',
        'max-age=0, s-maxage=30, stale-while-revalidate=300'
      );
      res.setHeader('X-version', etag);

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ notionData: data }));
    } else {
      next();
    }
  } catch (e) {
    console.error(e);
  }
}
