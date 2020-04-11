import { ReactHTML } from 'react';

import { Dictionary } from '../types';

export type ASTNode = Partial<{
  type: string;
  tagName: keyof ReactHTML;
  children?: ASTNode[];
  properties: Dictionary<any>;
  value?: string;
}>;
