import { IContentsNode } from '../../TableOfContents/types';

export const StudioContents: IContentsNode[] = [
  {
    name: 'Personal',
    depth: 0,
    type: 'divider',
  },
  {
    name: 'My Projects',
    depth: 0,
    icon: 'star',
    href: '/projects/username',
  },
  {
    name: 'GitHub',
    depth: 0,
    // icon: 'github',
    href: '/projects/username/github',
  },
  {
    name: 'Stoplight Next',
    depth: 0,
    // icon: 'gitlab',
    href: '/projects/username/stoplight-next',
  },
  {
    name: 'SendGrid',
    depth: 0,
    type: 'divider',
  },
  {
    name: 'GitHub',
    depth: 0,
    // icon: 'github',
    href: '/projects/sendgrid/github',
  },
  {
    name: 'Stoplight Next',
    depth: 0,
    // icon: 'gitlab',
    href: '/projects/sendgrid/stoplight-next',
  },
  {
    name: 'XYZ Corp',
    depth: 0,
    type: 'divider',
  },
  {
    name: 'GitHub',
    depth: 0,
    // icon: 'github',
    isActive: true,
    href: '/projects/xyz-corp/github',
  },
];
