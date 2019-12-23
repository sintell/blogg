import fetch from "isomorphic-unfetch";
const { parse } = require("url");

export async function get(req, res) {
  console.log('image')
  const {
    query: { url }
  } = parse(req.url, true);
  const r = await fetch(
    `https://www.notion.so/image/${encodeURIComponent(url)}`
  );
  res.setHeader("content-type", r.headers.get("content-type"));
  res.setHeader("cache-control", "max-age=100, s-maxage=500, stale-while-revalidate=5000");
  res.statusCode = 200;
  r.body.pipe(res);
}
