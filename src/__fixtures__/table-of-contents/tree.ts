import { ITableOfContentsLink } from '../../TableOfContents';

export const tree: ITableOfContentsLink[] = [
  {
    name: 'Tree',
    depth: 0,
    type: 'divider',
  },
  {
    name: 'Group',
    depth: 0,
    type: 'group',
  },
  {
    name: 'Nested Item',
    depth: 1,
    type: 'item',
  },
  {
    name: 'Nested Group',
    depth: 1,
    type: 'group',
  },
  {
    name: 'Nested Group',
    depth: 2,
    type: 'group',
  },
  {
    name: 'Nested Item',
    depth: 3,
    type: 'item',
  },
  {
    name: 'Nested Group',
    depth: 1,
    type: 'group',
  },
  {
    name: 'Nested Item',
    depth: 2,
    type: 'item',
  },
];
