export function parseNotionText(section) {
  if (section.properties) {
    return {
      type: 'text',
      value: section.properties.title,
    };
  }

  return null;
}
