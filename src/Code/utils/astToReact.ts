import { createElement } from 'react';

// todo: add actual type
// based on https://github.com/rexxars/react-lowlight/blob/master/src/mapChildren.js
export function mapChild(child: any, i: number, depth: number) {
  if (child.tagName) {
    return createElement(
      child.tagName,
      {
        key: `cv-${depth}-${i}`,
        ...child.properties,
        className: (child.properties.className || []).join(' '),
      },
      child.children && child.children.map(mapWithDepth(depth + 1))
    );
  }

  return child.value;
}

export function mapWithDepth(depth: number) {
  // todo: add actual type
  return function mapChildrenWithDepth(child: any, i: number) {
    return mapChild(child, i, depth);
  };
}
