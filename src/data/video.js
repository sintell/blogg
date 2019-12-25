export function parseNotionVideo(section) {
  if (section.properties) {
    return {
      type: 'video',
      caption: section.properties.caption,
      src: section.format.display_source,
      id: section.id,
    };
  }
  return null;
}

export function formatNotionSecureUrlRequest(video) {
  return {
    url: video.src,
    permissionRecord: {
      table: 'block',
      id: video.id,
    },
  };
}
