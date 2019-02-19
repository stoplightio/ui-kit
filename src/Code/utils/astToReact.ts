import { Dictionary } from '@stoplight/types';
import { createElement, ReactHTML, ReactNode } from 'react';

type ASTNode = Partial<{
  type: string;
  tagName: keyof ReactHTML;
  children?: ASTNode[];
  properties: Dictionary<any>;
  value?: string;
}>;

// based on https://github.com/rexxars/react-lowlight/blob/master/src/mapChildren.js
function mapChild(child: ASTNode, i: number, depth: number): ReactNode {
  if (child.tagName) {
    return createElement(
      child.tagName,
      {
        key: `cv-${depth}-${i}`,
        ...child.properties,
        className: child.properties && (child.properties.className || []).join(' '),
      },
      child.children && child.children.map(astToReact(depth + 1))
    );
  }

  return child.value;
}

export function astToReact(depth: number = 0) {
  return function mapChildrenWithDepth(child: ASTNode, i: number) {
    return mapChild(child, i, depth);
  };
}
