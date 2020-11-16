import { ITableOfContentsLink } from '../../TableOfContents';

export const tree: ITableOfContentsLink[] = [
  {
    name: 'Tree',
    depth: 0,
    type: 'divider',
  },
  {
    name: 'Group with link',
    depth: 0,
    type: 'group',
    to: '/path',
    icon: 'cloud',
  },
  {
    name: 'Nested Item with text icon',
    depth: 1,
    type: 'item',
    textIcon: 'ONE',
    iconColor: 'red',
    iconPosition: 'right',
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
    textIcon: 'TWO',
    iconColor: 'blue',
    iconPosition: 'right',
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
    textIcon: 'THREE',
    iconColor: 'green',
    iconPosition: 'left',
  },
];
