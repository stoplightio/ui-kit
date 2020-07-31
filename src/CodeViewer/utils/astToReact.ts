import { createElement, ReactNode } from 'react';
import { RefractorNode } from 'refractor/core';

// based on https://github.com/rexxars/react-lowlight/blob/master/src/mapChildren.js
function mapChild(child: RefractorNode, index: number, depth: number): ReactNode {
  if ('tagName' in child) {
    return createElement(
      child.tagName,
      {
        key: `cv-${depth}-${index}`,
        ...child.properties,
        className: child.properties && (child.properties.className || []).join(' '),
        'data-node-index': index,
      },
      child.children && child.children.map(astToReact(index + 1, depth + 1)),
    );
  }

  return child.value;
}

export function astToReact(index: number, depth: number = 0) {
  return function mapChildrenWithDepth(child: RefractorNode) {
    // eslint-disable-next-line no-param-reassign
    return mapChild(child, index++, depth);
  };
}
