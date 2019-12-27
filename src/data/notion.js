import fetch from 'isomorphic-unfetch';
import { parseNotionCallout } from './callout';
import { parseNotionCode } from './code';
import { parseNotionHeader } from './header';
import { parseNotionImage } from './image';
import { groupListItems, parseNotionList } from './list';
import { parseNotionQuote } from './quote';
import { parseNotionTable } from './table';
import { parseNotionText } from './text';
import { formatNotionSecureUrlRequest, parseNotionVideo } from './video';

const DATE_COLUMN_TAG = 'H{4i';
export async function getNotionPages(pageId) {
  const data = await loadPageChunk({ pageId });
  const blocks = values(data.recordMap.block);
  const META_TABLE_NAME = 'metadata';
  const ARTICLES_TABLE_NAME = 'articles';

  let sections = [];
  let meta = {};

  for (const block of blocks) {
    const value = block.value;
    if (value.type === 'collection_view') {
      const col = await queryCollection({
        collectionId: value.collection_id,
        collectionViewId: value.view_ids[0],
      });
      const collection = values(col.recordMap.collection)[0];

      const tableName = collection.value.name[0][0];
      const tableSchema = collection.value.schema;
      const collectionId = collection.value.id;

      const tableRows = parseNotionTable(
        col.recordMap.block,
        tableSchema,
        collectionId
      );

      if (tableName.toLowerCase() === META_TABLE_NAME) {
        meta = tableRows[0];
      }

      if (tableName.toLowerCase() === ARTICLES_TABLE_NAME) {
        sections = tableRows;
      }
    }
  }

  return { sections, meta };
}

export async function getNotionPageContent(pageId) {
  const data = await loadPageChunk({ pageId });
  const schema = values(data.recordMap.collection)[0].value.schema;
  const blocks = values(data.recordMap.block);
  const currentPageCollectionId = blocks
    .filter(b => b.value.id === pageId)
    .map(b => b.value.parent_id)[0];

  const meta = parseNotionTable(
    data.recordMap.block,
    schema,
    currentPageCollectionId
  )[0];
  let sections = [];

  for (const block of blocks) {
    const value = block.value;

    if (
      value.type === 'page' ||
      value.type === 'header' ||
      value.type === 'sub_header' ||
      value.type === 'sub_sub_header'
    ) {
      sections.push(parseNotionHeader(value));
      sections = sections.filter(Boolean);

      continue;
    }

    const section = sections[sections.length - 1];

    if (value.type === 'image') {
      section.children.push(parseNotionImage(value));
    } else if (value.type === 'text') {
      section.children.push(parseNotionText(value));
    } else if (value.type === 'quote') {
      section.children.push(parseNotionQuote(value));
    } else if (value.type === 'code') {
      section.children.push(parseNotionCode(value));
    } else if (value.type === 'bulleted_list') {
      section.children.push(parseNotionList(value));
    } else if (value.type === 'collection_view') {
      const col = await queryCollection({
        collectionId: value.collection_id,
        collectionViewId: value.view_ids[0],
      });
      const collection = values(col.recordMap.collection)[0];

      const tableName = collection.value.name[0][0];
      const tableSchema = collection.value.schema;
      const collectionId = collection.value.id;

      const tableRows = parseNotionTable(
        col.recordMap.block,
        tableSchema,
        collectionId
      );
      section.children.push({
        type: 'table',
        value: tableRows,
        name: tableName,
      });
    } else if (value.type === 'callout') {
      section.children.push(parseNotionCallout(value));
    } else if (value.type === 'video') {
      section.children.push(parseNotionVideo(value));
    } else {
      console.error('UNHANDLED', value.type, value.properties);
    }
  }

  for (const section of sections) {
    section.children = section.children
      .filter(Boolean)
      .reduce(groupListItems, []);
    const videos = section.children.filter(c => c.type === 'video');
    if (videos.length > 0) {
      try {
        const signedUrls = await getSignedFileUrls({
          urls: videos.map(formatNotionSecureUrlRequest),
        });
        videos.forEach(v => (v.src = signedUrls.signedUrls.shift()));
      } catch (e) {
        console.error(e);
      }
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
    filter = [{ property: 'title', type: 'title', comparator: 'is_not_empty' }],
    filter_operator = 'and',
    sort = [
      { type: 'date', property: DATE_COLUMN_TAG, direction: 'descending' },
    ],
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
