import { getNotionPageContent } from '../../data/notion';

export async function get(req, res, next) {
  try {
    console.log(req.params.slug);
    const data = await getNotionPageContent(req.params.slug);
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
      res.end(JSON.stringify({ notionData: data, etag }));
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }
}
