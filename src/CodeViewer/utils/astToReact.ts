import { createElement, ReactNode } from 'react';
import { RefractorNode } from 'refractor/core';

// based on https://github.com/rexxars/react-lowlight/blob/master/src/mapChildren.js
function mapChild(child: RefractorNode, i: number, depth: number): ReactNode {
  if ('tagName' in child) {
    return createElement(
      child.tagName,
      {
        key: `cv-${depth}-${i}`,
        ...child.properties,
        className: child.properties && (child.properties.className || []).join(' '),
      },
      child.children && child.children.map(astToReact(depth + 1)),
    );
  }

  return child.value;
}

export function astToReact(depth: number = 0) {
  return function mapChildrenWithDepth(child: RefractorNode, i: number) {
    return mapChild(child, i, depth);
  };
}
