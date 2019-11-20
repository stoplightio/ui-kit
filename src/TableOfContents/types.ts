import { IconName } from '@blueprintjs/icons';

export interface IContentsNode {
  name: string;
  depth: number;
  isActive?: boolean;
  disabled?: boolean;
  href?: string;
  type?: 'divider' | 'item';
  icon?: IconName;
  onClick?: (e: React.MouseEvent) => void;
}
