import { IconName } from '@blueprintjs/icons';

export interface IContentsNode {
  name: string;
  depth: number;
  isActive?: boolean;
  href?: string;
  meta?: string;
  type?: 'divider' | 'group' | 'item';
  icon?: IconName;
}

export type IconMapType = 'group' | 'divider' | 'item';
export type NodeIconMapping = { [type in IconMapType]?: IconName };
