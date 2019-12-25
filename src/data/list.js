export function parseNotionList(section) {
  return {
    type: 'listItem',
    title: section.properties.title,
  };
}

export function groupListItems(all, item) {
  if (item.type !== 'listItem') {
    all.push(item);
    return all;
  }
  if (all[all.length - 1].type !== 'list') {
    all.push({
      type: 'list',
      children: [item],
    });

    return all;
  }
  all[all.length - 1].children.push(item);
  return all;
}
