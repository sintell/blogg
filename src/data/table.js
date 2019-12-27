export function parseNotionTable(blocks, tableSchema, collectionId) {
  return Object.keys(blocks)
    .filter(id => {
      // get page objects that has collection as its parent
      // theese pages are rows in the table
      return blocks[id].value.parent_id === collectionId;
    })
    .map(id => ({
      // all properties (columns) of the table actually stored along with the page itself
      ...blocks[id].value.properties,
      // also we need a link to that page, to query for data
      link: blocks[id].value.id,
    }))
    .map(entry =>
      Object.keys(entry).reduce((labeled, id) => {
        if (tableSchema[id]) {
          const cleanName = tableSchema[id].name
            .toLowerCase()
            .replace(/[\W]/g, '_');

          const type = tableSchema[id].type;
          console.log(type);
          labeled[cleanName] =
            type == 'date' ? entry[id][0][1][0][1] : entry[id][0][0];
        } else {
          labeled[id] = entry[id];
        }
        return labeled;
      }, {})
    );
}
