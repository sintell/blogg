import fetch from 'isomorphic-unfetch';
const { parse } = require('url');

export async function get(req, res) {
  const { query } = parse(req.url, false);
  const url = query.substr(4);
  const { host, ...rest } = req.headers; // eslint-disable-line no-unused-vars
  console.log('fetching', url);
  const r = await fetch(url, { headers: rest });
  console.log('headers:', r.headers);
  for (const [name, value] of r.headers) {
    res.setHeader(name, value);
  }
  res.setHeader(
    'cache-control',
    'max-age=31536000, s-maxage=5000, stale-while-revalidate=50000'
  );
  res.statusCode = 206;
  r.body.pipe(res);
}
