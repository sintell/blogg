export function parseNotionCallout(section) {
  if (section.properties) {
    return {
      type: 'callout',
      value: section.properties.title,
    };
  }
  return null;
}
