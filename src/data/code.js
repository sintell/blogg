export function parseNotionCode(section) {
  if (section.properties) {
    return {
      type: 'code',
      value: section.properties.title[0][0],
      language: section.properties.language[0][0],
    };
  }

  return null;
}
