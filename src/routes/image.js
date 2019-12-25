import fetch from 'isomorphic-unfetch';
const { parse } = require('url');

export async function get(req, res) {
  const {
    query: { url },
  } = parse(req.url, true);
  const r = await fetch(
    `https://www.notion.so/image/${encodeURIComponent(url)}`
  );
  res.setHeader('content-type', r.headers.get('content-type'));
  res.setHeader(
    'cache-control',
    'max-age=31536000, s-maxage=5000, stale-while-revalidate=50000'
  );
  res.statusCode = 200;
  r.body.pipe(res);
}
