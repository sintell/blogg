export function parseNotionQuote(section) {
  if (section.properties) {
    return {
      type: 'quote',
      value: section.properties.title,
    };
  }

  return null;
}
