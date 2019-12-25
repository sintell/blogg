import fetch from 'isomorphic-unfetch';

export async function getNotionPages(pageId) {
  const data = await loadPageChunk({ pageId });
  const blocks = values(data.recordMap.block);

  const sections = [];
  for (const block of blocks) {
    const value = block.value;

    if (value.type === 'page') {
      if (value.parent_table == 'space') {
        continue;
      }
      const section = {
        title: value.properties.title,
        link: value.type === 'page' ? value.id : null,
        children: [],
        type: 'page',
      };

      sections.push(section);
      continue;
    }
  }

  return { sections };
}

export async function getNotionPageContent(pageId) {
  const data = await loadPageChunk({ pageId });
  const blocks = values(data.recordMap.block);

  const sections = [];
  let meta = {};
  let list = null;

  for (const block of blocks) {
    const value = block.value;

    if (
      value.type === 'page' ||
      value.type === 'header' ||
      value.type === 'sub_header' ||
      value.type === 'sub_sub_header'
    ) {
      if (value.type === 'page' && value.parent_table == 'space') {
        continue;
      }
      const section = {
        title: value.properties.title,
        link: value.type === 'page' ? value.id : null,
        type: value.type,
        id: value.id,
        children: [],
      };

      sections.push(section);
      continue;
    }

    const section = sections[sections.length - 1];

    if (value.type === 'image') {
      list = null;
      const child = {
        type: 'image',
        caption: value.properties.caption,
        src: `/image.js?url=${encodeURIComponent(value.format.display_source)}`,
      };
      section.children.push(child);
    } else if (value.type === 'text') {
      if (value.properties) {
        section.children.push({
          type: 'text',
          value: value.properties.title,
        });
      }
    } else if (value.type === 'quote') {
      list = null;
      if (value.properties) {
        section.children.push({
          type: 'quote',
          value: value.properties.title,
        });
      }
    } else if (value.type === 'code') {
      list = null;
      if (value.properties) {
        section.children.push({
          type: 'code',
          value: value.properties.title[0][0],
          language: value.properties.language[0][0],
        });
      }
    } else if (value.type === 'bulleted_list') {
      if (list == null) {
        list = {
          type: 'list',
          children: [],
        };
        section.children.push(list);
      }
      list.children.push(value.properties.title);
    } else if (value.type === 'collection_view') {
      const col = await queryCollection({
        collectionId: value.collection_id,
        collectionViewId: value.view_ids[0],
      });
      const table = {};
      const entries = values(col.recordMap.block).filter(
        block => block.value && block.value.parent_id === value.collection_id
      );
      for (const entry of entries) {
        if (entry.value.properties) {
          const props = entry.value.properties;

          // I wonder what `Agd&` is? it seems to be a fixed property
          // name that refers to the value
          table[
            props.title[0][0]
              .toLowerCase()
              .trim()
              .replace(/[ -_]+/, '_')
          ] = props['Agd&'];
        }

        if (sections.length === 1) {
          meta = table;
        } else {
          section.children.push({
            type: 'table',
            value: table,
          });
        }
      }
    } else if (value.type === 'callout') {
      list = null;
      if (value.properties) {
        section.children.push({
          type: 'callout',
          value: value.properties.title,
        });
      }
    } else if (value.type === 'video') {
      list = null;
      // skip this as we cant use src in our app, amazon requires token that we don't have
      if (value.properties) {
        const urls = {
          urls: [
            {
              url: value.format.display_source,
              permissionRecord: {
                table: 'block',
                id: value.id,
              },
            },
          ],
        };
        const signedUrls = await getSignedFileUrls(urls);
        section.children.push({
          type: 'video',
          caption: value.properties.caption,
          src: signedUrls.signedUrls[0],
        });
      }
    } else {
      list = null;
      console.error('UNHANDLED', value.type, value.properties);
    }
  }

  return { sections, meta };
}

async function rpc(fnName, body = {}) {
  console.log('do', fnName, body);

  const res = await fetch(`https://www.notion.so/api/v3/${fnName}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accepts: 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    console.log('done', fnName, body);
    const body = await res.json();
    return body;
  } else {
    throw new Error(await getError(res));
  }
}

async function getSignedFileUrls(urls) {
  return rpc('getSignedFileUrls', urls);
}

async function getError(res) {
  return `Notion API error (${res.status}) \n${getJSONHeaders(
    res
  )}\n ${await getBodyOrNull(res)}`;
}

function getJSONHeaders(res) {
  return JSON.stringify(res.headers.raw());
}

function getBodyOrNull(res) {
  try {
    return res.text();
  } catch (err) {
    return null;
  }
}

function queryCollection({
  collectionId,
  collectionViewId,
  loader = {},
  query = {},
}) {
  const {
    limit = 70,
    loadContentCover = true,
    type = 'table',
    userLocale = 'en',
    userTimeZone = 'Europe/Russia',
  } = loader;

  const {
    aggregate = [
      {
        aggregation_type: 'count',
        id: 'count',
        property: 'title',
        type: 'title',
        view_type: 'table',
      },
    ],
    filter = [],
    filter_operator = 'and',
    sort = [],
  } = query;

  return rpc('queryCollection', {
    collectionId,
    collectionViewId,
    loader: {
      limit,
      loadContentCover,
      type,
      userLocale,
      userTimeZone,
    },
    query: {
      aggregate,
      filter,
      filter_operator,
      sort,
    },
  });
}

function loadPageChunk({
  pageId,
  limit = 100,
  cursor = { stack: [] },
  chunkNumber = 0,
  verticalColumns = false,
}) {
  return rpc('loadPageChunk', {
    pageId,
    limit,
    cursor,
    chunkNumber,
    verticalColumns,
  });
}

function values(obj) {
  const vals = [];
  for (const key in obj) {
    vals.push(obj[key]);
  }
  return vals;
}
