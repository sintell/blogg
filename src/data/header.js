export function parseNotionHeader(section) {
  if (section.type === 'page' && section.parent_table == 'space') {
    return null;
  }
  return {
    title: section.properties.title,
    type: section.type,
    id: section.id,
    children: [],
  };
}
