export function parseNotionImage(section) {
  return {
    type: 'image',
    caption: section.properties.caption,
    src: `/image?url=${encodeURIComponent(section.format.display_source)}`,
  };
}
