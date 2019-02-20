import { Dictionary } from '@stoplight/types';
import { ReactHTML } from 'react';

export type ASTNode = Partial<{
  type: string;
  tagName: keyof ReactHTML;
  children?: ASTNode[];
  properties: Dictionary<any>;
  value?: string;
}>;
