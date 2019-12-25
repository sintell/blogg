import { getNotionPages } from '../../data/notion';

const MAIN_PAGE_ID = '8e42a85e-df33-4e21-b767-08185a8964f6';

export async function get(req, res, next) {
  try {
    const data = await getNotionPages(MAIN_PAGE_ID);
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
