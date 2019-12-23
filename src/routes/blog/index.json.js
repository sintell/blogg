import getNotionData from '../../data/notion';

export async function get(req, res, next) {
  try {
    const data = await getNotionData();
    if (data) {
      const etag = require('crypto')
        .createHash('md5')
        .update(JSON.stringify(data))
        .digest('hex');

      res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
      res.setHeader('X-version', etag);

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({notionData: data, etag}));

    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }



}
