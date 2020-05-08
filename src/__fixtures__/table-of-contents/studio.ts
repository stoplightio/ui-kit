import { ITableOfContentsLink } from '../../TableOfContents';

export const studioContents: ITableOfContentsLink[] = [
  {
    name: 'Personal',
    depth: 0,
    type: 'divider',
  },
  {
    name: 'My Projects',
    depth: 0,
    to: '/projects/username',
  },
  {
    name: 'GitHub',
    depth: 0,
    to: '/projects/username/github',
    meta: 'v1.0.0',
  },
  {
    name: 'Stoplight Next',
    depth: 0,
    to: '/projects/username/stoplight-next',
  },
  {
    name: 'SendGrid',
    depth: 0,
    type: 'divider',
  },
  {
    name: 'GitHub',
    depth: 0,
    to: '/projects/sendgrid/github',
    meta: 'v2.0.0',
  },
  {
    name: 'Stoplight Next',
    depth: 0,
    icon: 'star',
    to: '/projects/sendgrid/stoplight-next',
    meta: 'v1.0.0',
  },
  {
    name: 'XYZ Corp',
    depth: 0,
    type: 'divider',
  },
  {
    name: 'GitHub',
    depth: 0,
    isActive: true,
    to: '/projects/xyz-corp/github',
  },
];
