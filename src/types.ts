import { IconName } from '@blueprintjs/icons';
import { NodeType } from '@stoplight/types';

export interface IDeserializedSrn {
  service: string;
  org: string;
  project: string;
  uri: string;
}

export interface IContentsNode {
  name: string;
  depth: number;
  isActive?: boolean;
  href?: string;
  type?: 'divider' | 'group' | 'item';
  icon?: IconName;
}

export type IconMapType = NodeType | 'group' | 'divider' | 'item';
export type NodeIconMapping = { [type in IconMapType]?: IconName };
